import fetch from 'node-fetch';

const API_URL = 'https://api-ai.qiliangjia.org/v1/chat-messages';
const API_KEY = process.env.DIFY_API_KEY;

export async function callDify(query: string) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'test-user-001',
        inputs: {},
        query,
      }),
    });

    const data: any = await response.json();

    if (response.ok) {
      return data.answer;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    throw error;
  }
}

