package HGI;

import java.io.IOException;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.*;
import java.util.Map;


public class UserGroupMapper extends MapReduceBase implements Mapper <LongWritable, Text, Text, Text> {


	Map<String, String> userIdMap;
	Map<String, String> groupIdMap;

	public UserGroupMapper(){
		userIdMap = Name.getUserIdMap();
		groupIdMap = Name.getGroupIdMap();
	}


	public void map(LongWritable key, Text value, OutputCollector <Text, Text> output, Reporter reporter) throws IOException {
		
		String valueString = value.toString();
		String[] iNodeData = valueString.split("\t");
		String uid = iNodeData[2];
		String gid = iNodeData[3];
		String userName = userIdMap.get(uid);
		String groupName = groupIdMap.get(gid);
		String newKey = userName+ ":" + groupName;
		output.collect(new Text(newKey), value);
	}
}

