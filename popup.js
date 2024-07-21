document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('saveButton');

  
    saveButton.addEventListener('click', () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "extractFormData"}, (response) => {
            if (response && response.data) {
              const dataa = response.data; // Use the whole response data, not just the first item
              chrome.storage.local.set({'formData': dataa}).then( () => {
                const result = 'Stored form data: ' + JSON.stringify(dataa, null, 2);
                console.log(result);
                document.getElementById('status').innerText = result;
              });
            } else {
              document.getElementById('status').innerText = 'No form data found.'; 
            }
          });
        }
      });
    });
  

  // Check stored data
  chrome.storage.local.get('formData', (result) => {
    console.log('Stored form data:', result.formData);
    if (result.formData) { 
      document.getElementById('status').innerText = 'Stored form data: ' + JSON.stringify(result.formData, null, 2);
    } else {
      document.getElementById('status').innerText = 'No form data stored.';
    }
  });
});
