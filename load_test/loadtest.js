import http from 'k6/http';
import {sleep} from 'k6';

export let options = {

    stages: [  
        {duration: '30s', target: 20},  // en los primeros 30 segundos habran 10usuarios 
        {duration: '1m', target: 300},  // en los primeros 30 segundos habran 10usuarios 
        {duration: '1m', target: 150},  // en los primeros 30 segundos habran 10usuarios 
        {duration: '2m', target: 0},  // en los primeros 30 segundos habran 10usuarios 
    ]
};

export default function (){
    http.get('http://localhost:3030/api/contacts');
    sleep(1);
}

//  k6 run C:\Abschlussprojekt\E-commerce\e-commerce-backend\load_test\loadtest.js

