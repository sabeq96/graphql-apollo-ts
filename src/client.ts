import * as mongoose from 'mongoose';

const dbConfig = {
  url: 'mongodb://sabek:sabek1234@ds213178.mlab.com:13178/test-graphql',
};

mongoose.set("debug", true);
mongoose.connect(dbConfig.url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${dbConfig.url}`));
