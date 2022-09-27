import http from 'k6/http';

const END_POINT = 'https://c5b0-201-185-10-54.ngrok.io/pubsub-poc/publish';

export const options = {
  vus: 50, // concurrent runners
  duration: '60s', // time of execution for each vu
  thresholds: {
    http_req_failed: ['rate<0.01'], // less than 1% errors
    http_req_duration: ['p(95)<5000'], // 95% below 5000ms
  },
};

const generateFakeNumber = () => {
  const phoneNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  return phoneNumber;
};

const generateFakeString = () => {
  const string = Math.random().toString(36).substring(2, 15);
  return string;
};

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const payload = JSON.stringify({
    message: generateFakeString(),
    value: generateFakeNumber(),
  });

  http.post(END_POINT, payload, params);
}
