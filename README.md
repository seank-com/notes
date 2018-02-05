# Machine Configuration

Here I document install steps, scripts and settings I use for each platform I work on.

## [Mac](machine-config/MAC.md)
## [Windows](machine-config/Windows.md)
## Linux [Desktop](machine-config/Linux-desktop.md) [Server](machine-config/Linux-server.md)
## [Cloud](machine-config/Cloud.md)
## [Azure](azure/README.md)

# Travel

My notes on traveling abroad to places (thanks to business) that I visit often.

## [ShenZhen, China](travel/ShenZhen.md)

# Tips and tricks

### Replace CRLF with LF

```
perl -i.org -pe 's/\r\n/\n/' filename
```

# Technologies

## Vue

See [Vue's framework comparison](https://vuejs.org/v2/guide/comparison.html) or better yet, read the [guide](https://vuejs.org/v2/guide/). Take a look at the Vue [community resource](https://github.com/vuejs/awesome-vue). State management is handled by either [Vuex]() Vue's Flux/Redux/Elm inspired implementation, or [vue-router](https://github.com/vuejs/vue-router) which is documented [here](http://router.vuejs.org/en/index.html)

## React / Redux

Redux Principles

- The whole state of your application is represented in a single
  Javascript object.
- The state is read-only. Anytime you want to change the state
  tree you must dispatch an action.
- To describe state mutations you have to write a pure Reducer
  function that takes the previous state of the app and the action
  being dispatched and returns the next state of the app.

[Video Training for Redux](https://egghead.io/lessons/javascript-redux-the-single-immutable-state-tree)
[React Pen](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010)
[React Hello World](https://facebook.github.io/react/docs/hello-world.html)
[React Home](https://facebook.github.io/react/)

## Big data

- **MapReduce** is the Google paper that started it all ([Page on googleusercontent.com](http://static.googleusercontent.com/media/research.google.com/en/us/archive/mapreduce-osdi04.pdf)). It's a paradigm for writing distributed code inspired by some elements of functional programming. You don't have to do things this way, but it neatly fits a lot of problems we try to solve in a distributed way. The Google internal implementation is called MapReduce and **Hadoop** is it's open-source implementation. Amazon's Hadoop instance is called Elastic MapReduce (**EMR**) and has plugins for multiple languages.
- **HDFS** is an implementation inspired by the [Google File System](http://research.google.com/archive/gfs.html) (GFS) to store files across a bunch of machines when it's too big for one. Hadoop consumes data in HDFS (Hadoop Distributed File System).
- **Apache Spark** is an emerging platform that has more flexibility than MapReduce but more structure than a basic message passing interface. It relies on the concept of distributed data structures (what it calls RDDs) and operators. See this page for more: [The Apache Software Foundation](http://apache.org/)

   Because Spark is a lower level thing that sits on top of a message passing interface, it has higher level libraries to make it more accessible to data scientists. The Machine Learning library built on top of it is called **MLib** and there's a distributed graph library called **GraphX**.
- **Pregel** and it's open source twin **Giraph** is a way to do graph algorithms on billions of nodes and trillions of edges over a cluster of machines. Notably, the MapReduce model is not well suited to graph processing so Hadoop/MapReduce are avoided in this model, but HDFS/GFS is still used as a data store.
- **Zookeeper** is a coordination and synchronization service that a distributed set of computer make decisions by consensus, handles failure, etc.
- **Flume** and **Scribe** are logging services, Flume is an Apache project and Scribe is an open-source Facebook project. Both aim to make it easy to collect tons of logged data, analyze it, tail it, move it around and store it to a distributed store.
- Google **BigTable** and it's open source twin **HBase** were meant to be read-write distributed databases, originally built for the Google Crawler that sit on top of GFS/HDFS and MapReduce/Hadoop. [Google Research Publication: BigTable](http://research.google.com/archive/bigtable.html)
- **Hive** and **Pig** are abstractions on top of Hadoop designed to help analysis of tabular data stored in a distributed file system (think of excel sheets too big to store on one machine). They operate on top of a data warehouse, so the high level idea is to dump data once and analyze it by reading and processing it instead of updating cells and rows and columns individually much. Hive has a language similar to SQL while Pig is inspired by Google's **Sawzall** - [Google Research Publication: Sawzall](http://research.google.com/archive/sawzall.html). You generally don't update a single cell in a table when processing it with Hive or Pig.

   Hive and Pig turned out to be slow because they were built on Hadoop which optimizes for the volume of data moved around, not latency. To get around this, engineers bypassed and went straight to HDFS. They also threw in some memory and caching and this resulted in Google's **Dremel** ([Dremel: Interactive Analysis of Web-Scale Datasets](http://research.google.com/pubs/pub36632.html)), **F1** ([F1 - The Fault-Tolerant Distributed RDBMS Supporting Google's Ad Business](http://research.google.com/pubs/pub38125.html)), Facebook's **Presto** ([Presto | Distributed SQL Query Engine for Big Data](http://prestodb.io/)), Apache **Spark SQL** ([Page on apache.org](http://spark.incubator.apache.org/and)), Cloudera **Impala** ([Cloudera Impala: Real-Time Queries in Apache Hadoop, For Real](http://blog.cloudera.com/blog/2012/10/cloudera-impala-real-time-queries-in-apache-hadoop-for-real/)), Amazon's **Redshift**, etc. They all have slightly different semantics but are essentially meant to be programmer or analyst friendly abstractions to analyze tabular data stored in distributed data warehouses.
- **Mahout** ([Scalable machine learning and data mining](https://mahout.apache.org/)) is a collection of machine learning libraries written in the MapReduce paradigm, specifically for Hadoop. Google has it's own internal version but they haven't published a paper on it as far as I know.
- **Oozie** is a workflow scheduler. The oversimplified description would be that it's something that puts together a pipeline of the tools described above. For example, you can write an Oozie script that will scrape your production HBase data to a Hive warehouse nightly, then a Mahout script will train with this data. At the same time, you might use pig to pull in the test set into another file and when Mahout is done creating a model you can pass the testing data through the model and get results. You specify the dependency graph of these tasks through Oozie (I may be messing up terminology since I've never used Oozie but have used the Facebook equivalent).
- **Lucene** is a bunch of search-related and NLP tools but it's core feature is being a search index and retrieval system. It takes data from a store like HBase and indexes it for fast retrieval from a search query. **Solr** uses Lucene under the hood to provide a convenient REST API for indexing and searching data. **ElasticSearch** is similar to Solr.
- **Sqoop** is a command-line interface to back SQL data to a distributed warehouse. It's what you might use to snapshot and copy your database tables to a Hive warehouse every night.
- **Hue** is a web-based GUI to a subset of the above tools - http://gethue.com/
