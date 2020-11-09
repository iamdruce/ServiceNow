import '../src/x-551463-hello-world';
import '../src/x-551463-card-list';
import '../src/x-551463-incident-list';


const el = document.createElement('DIV');
document.body.appendChild(el);

el.innerHTML = `		
<x-551463-hello-world></x-551463-hello-world>
<x-551463-card-list></x-551463-card-list>
<x-551463-incident-list></x-551463-incident-list>
`;

