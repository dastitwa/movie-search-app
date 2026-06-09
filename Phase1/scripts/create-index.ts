import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'u66h6+U1GxWsPu4L8px_',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function createIndex() {
  const indexName = 'movies';

  try {
    const exists = await client.indices.exists({
      index: indexName,
    });

    if (exists) {
      console.log(`Index '${indexName}' already exists.`);
      return;
    }

    const response = await client.indices.create({
      index: indexName,
    });

    console.log('Index created successfully');
    console.log(response);
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

createIndex();