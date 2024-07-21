// Function to extract form labels and their filled values
console.log('Content script loaded');
function storeGreeting() {
  const greeting = "hi";
  
  chrome.storage.local.set({greeting: greeting}, function() {
    console.log('Value is set to ' + greeting);
  });
  
  chrome.storage.local.get(['greeting'], function(result) {
    console.log('Value currently is ' + result.key);
  });
}
function extractFormData() {
    storeGreeting()
    const formData = {};
    const FormElement = document.getElementsByTagName("form")[0];
    const selectorStr = "input[type='text'], input[type='email'], input[type='number'], input[type='tel'], input[type='url']";
    const inputs = FormElement.querySelectorAll(selectorStr);

  if(inputs){
    inputs.forEach((input) => {
      const label=input.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
      const value = input.value?input.value:'';
  
      if (label) {
        formData[label] = value;
        console.log({label:value})
      }
    });}else console.log("no input data")

    return formData;
  }


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractFormData") {
      const data = extractFormData();
      sendResponse({data: data});
     return true;
    }
  });
  