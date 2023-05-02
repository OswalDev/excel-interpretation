import { request } from 'axios';
import FormData from 'form-data';

const data = new FormData();
data.append('file', ); 

const options = {
  method: 'POST',
  url: 'https://excel-to-json.p.rapidapi.com/upload',
  headers: {
    token: 'randomiszation@123',
    'X-RapidAPI-Key': 'aa99b54e6fmsh58565e560caf84ep1b7a81jsnf7da3cf59c5b',
    'X-RapidAPI-Host': 'excel-to-json.p.rapidapi.com',
    ...data.getHeaders(),
  },
  data: data
};

try {
	const response = await request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}