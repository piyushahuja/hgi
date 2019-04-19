package HGI;


import java.util.Map;
import java.util.HashMap;
import java.io.*;

public class Name {

	interface Processor {
		public void processLine(String line, Map<String, String> map);
	}

	private static void processFile(String filePath, Map<String, String> map, Processor fileProcessor){
		try {
			FileInputStream fstream = new FileInputStream(filePath);
			BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
			String line = br.readLine();
			while (line != null){
				fileProcessor.processLine(line, map);
				line = br.readLine();
			}
			fstream.close();
		} catch (Exception e){
			System.out.println(e);
		}
		
		
	}
	
	public static Map<String, String> getUserIdMap(){
		String pathToFile = "./etc/passwd";
		Map<String, String> userIdMap = new HashMap<>();

		processFile(pathToFile, userIdMap, (String line, Map<String, String> map) -> {
			String[] recordValues =  line.split("\t");
			String userId = recordValues[2];
			String userName = recordValues[0];
			map.put(userId, userName);
		});
		return userIdMap;

	}

	public static Map<String, String> getGroupIdMap(){
		
		String pathToFile = "./etc/group";
		Map<String, String> groupIdMap = new HashMap<>();

		processFile(pathToFile, groupIdMap, (String line, Map<String, String> map) -> {
			String[] recordValues =  line.split("\t");
			String groupId = recordValues[2];
			String groupName = recordValues[0];
			map.put(groupId, groupName);
		});

		return groupIdMap;
	};


}





