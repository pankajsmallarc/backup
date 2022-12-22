//import org.apache.kafka.clients.consumer.ConsumerRecord;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.jupiter.api.Assertions;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.messaging.MessageHeaders;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.util.HashMap;
//import java.util.Map;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class CosmosInDevPreAdjTests {
//    private static final String DATA_PATH = "./src/test/resources/data/sampleMessage/preadj/";
//
//    Map<String, Object> map = new HashMap<>();
//    private MessageHeaders header = new MessageHeaders(map);
//
//    @Autowired
//    private MongoTemplate mongoTemplate;
//
//    @Autowired
//    private PropertiesUtilELR propertiesUtilELR;
//
//    @Autowired
//    private KafkaConsumerELR kafkaConsumerELR;
//
//    @Before
//    public void setup() {
//        Map<String, Object> map = new HashMap<>();
//        map.put("key", new Object());
//        header = new MessageHeaders(map);
//    }
//
//    @Test
//    public void givenValidMessage_whenClaimSystemIsCOSM_thenNewRecordIsCreated() throws IOException {
//        String filePath = DATA_PATH + "preadjcosmsummary.json";
//        String inDevCollection = propertiesUtilELR.getMongoCollections().get(Constants.RECORD_TYPE_INDEV);
//
//        PreAdjRoot root = TestUtils.getInstance().initPreAdjRootTestData(filePath);
//        String claimNumber = Utils.getClaimNumber(root);
//        Query query = new Query();
//        query.addCriteria(Criteria.where(Constants.CLAIM_DETAILS__CLAIM_NUMBER).is(claimNumber)
//                .and(Constants.RECORDTYPE).is(Constants.RECORD_TYPE_INDEV));
//
//        //remove all records before saving.
//        mongoTemplate.remove(query, InDevRecord.class, inDevCollection);
//        boolean isRecordExistsBeforeSaving = mongoTemplate.exists(query, InDevRecord.class, inDevCollection);
//        Assertions.assertFalse(isRecordExistsBeforeSaving);
//
//        //save record
//        String message = new String(Files.readAllBytes(Paths.get(filePath)));
//        ConsumerRecord<String, String> consumerRecord = new ConsumerRecord<>(propertiesUtilELR.getInDevPreAdjTopic(), 0, 123, "Key", message);
//        kafkaConsumerELR.consumeIndevPreAdjData(header, consumerRecord);
//
//        boolean isRecordSaved = mongoTemplate.exists(query, InDevRecord.class, inDevCollection);
//        Assertions.assertTrue(isRecordSaved);
//
//        //assert record status,system sys id, attachment.
//        InDevRecord record = mongoTemplate.findOne(query, InDevRecord.class, inDevCollection);
//        Assertions.assertEquals(Constants.INPROGRESS, record.getRecordInfo().getRecordStatus());
//        Assertions.assertEquals(Constants.COSM, record.getClaimDetails().getClaimSysId());
//        Assertions.assertEquals(Constants.NOT_AVAILABLE, record.getAttachmentInfo().getAttachmentStatus());
//
//        //removed record after testing.
//        mongoTemplate.remove(query, InDevRecord.class, inDevCollection);
//        Boolean isRecordExistsAfterSaving = mongoTemplate.exists(query, InDevRecord.class, inDevCollection);
//        Assertions.assertFalse(isRecordExistsAfterSaving);
//    }
//
//    @Test
//    public void givenValidMessage_whenClaimSystemIsNotCOSM_thenNewRecordIsNotCreated() throws IOException {
//        String filePath = DATA_PATH + "preadjcosmsummaryNotCOSM.json";
//        String inDevCollection = propertiesUtilELR.getMongoCollections().get(Constants.RECORD_TYPE_INDEV);
//
//        PreAdjRoot root = TestUtils.getInstance().initPreAdjRootTestData(filePath);
//        String claimNumber = Utils.getClaimNumber(root);
//
//        Query query = new Query();
//        query.addCriteria(Criteria.where(Constants.CLAIM_DETAILS__CLAIM_NUMBER).is(claimNumber)
//                .and(Constants.RECORDTYPE).is(Constants.RECORD_TYPE_INDEV));
//
//        //remove all records before saving.
//        mongoTemplate.remove(query, InDevRecord.class, inDevCollection);
//        boolean isRecordExistsBeforeSaving = mongoTemplate.exists(query, InDevRecord.class, inDevCollection);
//        Assertions.assertFalse(isRecordExistsBeforeSaving);
//
//        //save record
//        String message = new String(Files.readAllBytes(Paths.get(filePath)));
//        ConsumerRecord<String, String> consumerRecord = new ConsumerRecord<>(propertiesUtilELR.getInDevPreAdjTopic(), 0, 123, "Key", message);
//        kafkaConsumerELR.consumeIndevPreAdjData(header, consumerRecord);
//
//        boolean isRecordSaved = mongoTemplate.exists(query, InDevRecord.class, inDevCollection);
//        Assertions.assertFalse(isRecordSaved);
//    }
//}
