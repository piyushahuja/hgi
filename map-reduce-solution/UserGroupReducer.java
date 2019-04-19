package HGI;

import java.io.IOException;
import java.util.*;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.*;
import java.math.BigInteger;

public class UserGroupReducer extends MapReduceBase implements Reducer<Text, Text, Text, Text> {

	public void reduce(Text t_key, Iterator<Text> values, OutputCollector<Text,Text> output, Reporter reporter) throws IOException {
		Text key = t_key;
		long numInodes = 0;
		long totalSize = 0;
		BigInteger lastModified = new BigInteger("0");
	
		while (values.hasNext()) {
			// replace type of value with the actual type of our value
		
			Text value = (Text) values.next();
			String valueString = value.toString();
			String[] iNodeData = valueString.split("\t");
			long iNodeSize = Long.parseLong(iNodeData[1]);
			BigInteger iNodeLastModified = new BigInteger(iNodeData[5]);
			numInodes++;
			totalSize = totalSize + iNodeSize;
			if (iNodeLastModified.compareTo(lastModified)>0){
				lastModified = iNodeLastModified;
			}
		}
		if (lastModified.equals(0)){
			lastModified = null;
		}
		String reducedValue = "{" + t_key + ":" + numInodes + ":" + totalSize + ":" + lastModified + "}";

		output.collect(key, new Text(reducedValue));
	}
}




/**


Input Path: hdfs://localhost:8020/inputMapReduce
Yarn Resource Manager Layer: http://localhost:8088/cluster


export HADOOP_HOME="/usr/local/Cellar/hadoop/3.1.2/libexec" 

export CLASSPATH="$HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-client-core-3.1.2.jar:$HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-client-common-3.1.2.jar:$HADOOP_HOME/share/hadoop/common/hadoop-common-3.1.2.jar:.:./HGI"


$HADOOP_HOME/bin/hdfs dfs -copyFromLocal ~/inputMapReduce /
$HADOOP_HOME/bin/hdfs dfs -ls /mapreduce_output_sales
$HADOOP_HOME/bin/hdfs dfs -cat /mapreduce_output_sales/part-00000

 	
 /usr/local/Cellar/hadoop/3.1.2/bin/hdfs dfs -ls /inputMapReduce
 /usr/local/Cellar/hadoop/3.1.2/bin/hdfs dfs -copyFromLocal ~/inputMapReduce /


Ports
8080
port 9870 
In fact, lots of others ports changed too. Look:
Namenode ports: 50470 --> 9871, 50070 --> 9870, 8020 --> 9820
Secondary NN ports: 50091 --> 9869, 50090 --> 9868
Datanode ports: 50020 --> 9867, 50010 --> 9866, 50475 --> 9865, 50075 --> 9864



javac -d . SalesMapper.java SalesCountryReducer.java SalesCountryDriver.java
jar cfm ProductSalePerCountry.jar Manifest.txt SalesCountry/*.class




 hdfs dfsadmin -safemode leave
 stop hadoop and clean temp files from hduser sudo rm -R /tmp/*
 hdfs namenode -format
 jps
 Re-format filesystem in Storage Directory root= /usr/local/Cellar/hadoop/hdfs/namenode
 
 */

