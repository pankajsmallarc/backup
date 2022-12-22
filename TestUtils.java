import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class TestUtils {
    private static final String MSG_SRC_DATA_FILE = "/data/sampleMessage/";

    private static TestUtils instance = null;

    private TestUtils() {
    }

    public static TestUtils getInstance() {
        if (instance == null) {
            instance = new TestUtils();
        }

        return instance;
    }

    public PreAdjRoot initPreAdjRootTestData(String filePath) {

        PreAdjRoot root;
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);
            mapper.enable(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT);

            String content = new String(Files.readAllBytes(Paths.get(filePath)));
            root = mapper.readValue(content, PreAdjRoot.class);
        } catch (IOException exception) {
            throw new RuntimeException("error reading content " + exception);
        }
        return root;
    }

    public ETS_CASE initAppealsTestData(String filePath) {

        ETS_CASE appealsRecord;
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);
            mapper.enable(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT);

            String content = new String(Files.readAllBytes(Paths.get(filePath)));
            appealsRecord = mapper.readValue(content, ETS_CASE.class);
        } catch (IOException exception) {
            throw new RuntimeException("error reading content " + exception);
        }
        return appealsRecord;
    }
}
