    @Value("${mq-server}")
    private String host;

    @Value("${mq-port:1414}")
    private String port;

    @Value("${mq-manager}")
    private String queueManager;

    @Value("${mq-username}")
    private String username;

    @Value("${mq-password}")
    private String password;

    @Value("${mq-receive-timeout:30000}")
    private String receiveTimeout;

    @Value("${application-event-queue-channel}")
    private String channel;

    @Value("${mq-sslCipherSuite}")
    private String ciphers;

    @Value("${server.ssl.key-store}")
    private String keyStore;

    @Value("${server.ssl.key-store-password}")
    private String keyStorePassword;

    @Value("${dxp.mtsResponseQueue}")
    private String mtsResponseQueue;

    @Value("${dxp.mtsRequestQueue}")
    private String mtsRequestQueue;

    @Value("${targetClient:1}")
    private int targetClient;

    @PostConstruct
    public void setup() {
        System.setProperty("com.ibm.mq.cfg.useIBMCipherMappings", "false");
    }

    @Bean(name = "mtsRequestQueue")
    Destination newInterfaceQueue() throws JMSException {
        MQQueue mqQueue = new MQQueue(mtsRequestQueue);
        mqQueue.setTargetClient(targetClient);
        return mqQueue;
    }

    @Bean(name = "mtsResponseQueue")
    Destination newReplyQueue() throws JMSException {
        MQQueue mqQueue = new MQQueue(mtsResponseQueue);
        mqQueue.setTargetClient(targetClient);
        return mqQueue;
    }

    @Bean
    public JmsOperations newJmsOperations(UserCredentialsConnectionFactoryAdapter connectionFactory) {
        JmsTemplate jmsTemplate = new JmsTemplate(connectionFactory);
        jmsTemplate.setReceiveTimeout(Long.parseLong(receiveTimeout));
        return jmsTemplate;
    }

    @Bean
    @Primary
    public UserCredentialsConnectionFactoryAdapter userCredentialsConnectionFactoryAdapter(
            MQQueueConnectionFactory mqQueueConnectionFactory) {
        UserCredentialsConnectionFactoryAdapter userCredentialsConnectionFactoryAdapter = new UserCredentialsConnectionFactoryAdapter();
        userCredentialsConnectionFactoryAdapter.setUsername(username);
        userCredentialsConnectionFactoryAdapter.setPassword(password);
        userCredentialsConnectionFactoryAdapter.setTargetConnectionFactory(mqQueueConnectionFactory);
        return userCredentialsConnectionFactoryAdapter;
    }

    @Bean
    public MQQueueConnectionFactory mqQueueConnectionFactory()
            throws JMSException, GeneralSecurityException, IOException {
        MQQueueConnectionFactory mqQueueConnectionFactory = new MQQueueConnectionFactory();
        log.info("MQ Host: " + host);
        log.info("MQ Port: " + port);
        log.info("MQ UserId: " + username);
        log.info("MQ Channel: " + channel);
        log.info("MQ Manager: " + queueManager);
        log.info("MQ Cipher Suite: " + ciphers);
        mqQueueConnectionFactory.setHostName(host);
        mqQueueConnectionFactory.setTransportType(WMQConstants.WMQ_CM_CLIENT);
        mqQueueConnectionFactory.setPort(Integer.parseInt(port));
        mqQueueConnectionFactory.setStringProperty(WMQConstants.USERID, username);
        mqQueueConnectionFactory.setAppName("TME-Enrollment Service");
        mqQueueConnectionFactory.setChannel(channel);
        mqQueueConnectionFactory.setQueueManager(queueManager);
        mqQueueConnectionFactory.setSSLCipherSuite(ciphers);
        mqQueueConnectionFactory.setSSLSocketFactory(getSSLContextWithCert().getSocketFactory());

        return mqQueueConnectionFactory;
    }

    private SSLContext getSSLContextWithCert() throws GeneralSecurityException, IOException {
        SSLContext sslcontext = SSLContext.getInstance("TLSv1.2");
        KeyManager[] kms = null;
        if (keyStore != null) {
            keyStore = StringUtils.removeStart(keyStore, "classpath:");
            KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
            KeyStore ks = KeyStore.getInstance("jks");
            Resource resource = new ClassPathResource(keyStore);
            try (InputStream inputStream = resource.getInputStream()) {
                ks.load(inputStream, keyStorePassword.toCharArray());
            }
            char[] password = null;
            if (keyStorePassword.length() > 0) {
                password = keyStorePassword.toCharArray();
            }
            kmf.init(ks, password);
            kms = kmf.getKeyManagers();
            sslcontext.init(kms, null, null);
        }
        return sslcontext;
    }
