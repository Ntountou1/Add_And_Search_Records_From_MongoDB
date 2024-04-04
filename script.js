// Function to fetch countries from the API
async function fetchCountries() {
  try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      return data.map(country => country.name.common);
  } catch (error) {
      console.error('Error fetching countries:', error);
      return []; // Return empty array in case of error
  }
}

// Function to populate the country selection dropdown
async function populateCountries() {
  const countries = await fetchCountries();
  const countrySelect = document.getElementById('country');

  // Define priority countries
  const priorityCountries = ["Greece", "Cyprus", "Malta", "Bulgaria"];

  // Sort countries alphabetically, excluding priority countries
  const remainingCountries = countries.filter(country => !priorityCountries.includes(country)).sort();

  // Add priority countries to the beginning of the list
  priorityCountries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.text = country;
    countrySelect.appendChild(option);
  });

  // Add a separator if priority countries exist and there are other countries
  if (priorityCountries.length > 0 && remainingCountries.length > 0) {
    const separator = document.createElement('option');
    separator.disabled = true;
    separator.text = "------------------";
    countrySelect.appendChild(separator);
  }

  // Add remaining countries alphabetically
  remainingCountries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.text = country;
    countrySelect.appendChild(option);
  });
}


// Function to show the country field
function showCountryField() {
  document.getElementById('countryField').style.display = 'block';
  document.getElementById('country').focus();
}

// Event listener for Enter key press in the account field
document.getElementById('account').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      showCountryField(); // Show the country field
  }
});

// Populate country selection dropdown on page load
populateCountries();

// Function to show the type field
function showTypeField() {
  document.getElementById('typeField').style.display = 'block';
}

// Event listener for change event in the country field
document.getElementById('country').addEventListener('change', function () {
  showTypeField(); // Show the type field
});

// Function to show the activity field
function showActivityField() {
  document.getElementById('activityField').style.display = 'block';
  document.getElementById('activity').focus();
}

// Event listener for change event in the type field
document.querySelectorAll('input[name="type"]').forEach(function (radioButton) {
  radioButton.addEventListener('change', function () {
      showActivityField(); // Show the activity field
  });
});

// Function to show the line of business field
function showLineOfBusinessField() {
  document.getElementById('lineOfBusinessField').style.display = 'block';
}

// Event listener for Enter key press in the activity field
document.getElementById('activity').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      showLineOfBusinessField(); // Show the line of business field
  }
});

// Function to show the turnover field
function showTurnoverField() {
  document.getElementById('turnoverField').style.display = 'block';
  document.getElementById('turnover').focus();
}

// Event listener for change event in the line of business field
document.getElementById('lineOfBusiness').addEventListener('change', function () {
  showTurnoverField(); // Show the turnover field
});


// Function to show the limit of indemnity field with integer fields based on the selected line of business
function showLimitOfIndemnityField(lineOfBusiness) {
  const limitOfIndemnityField = document.getElementById('limitOfIndemnityField');
  const limitOfIndemnityOptions = document.getElementById('limitOfIndemnityOptions');
  
  // Clear any existing options
  limitOfIndemnityOptions.innerHTML = '';

  // Define the integer fields based on the selected line of business
  let fields = [];
  switch (lineOfBusiness) {
      case 'GTPL':
          fields = ['GTPL per claim', 'GTPL in the aggregate'];
          break;
      case 'PL':
          fields = ['PL per claim', 'PL in the aggregate'];
          break;
      case 'EL':
          fields = ['EL per claim', 'EL in the aggregate'];
          break;
      case 'PI':
          fields = ['PI per claim', 'PI in the aggregate'];
          break;
      case 'TPL & PL':
          fields = ['TPL per claim', 'TPL in the aggregate', 'PL per claim', 'PL in the aggregate'];
          break;
      case 'TPL & PI':
          fields = ['TPL per claim', 'TPL in the aggregate', 'PI per claim', 'PI in the aggregate'];
          break;
      case 'TPL & PI & EL':
          fields = ['TPL per claim', 'TPL in the aggregate', 'PI per claim', 'PI in the aggregate', 'EL per claim', 'EL in the aggregate'];
          break;
      case 'Terrorism':
          fields = ['Terrorism per claim', 'Terrorism in the aggregate'];
          break;
      case 'ENV. LIAB':
          fields = ['ENV. LIAB per claim', 'ENV. LIAB in the aggregate'];
          break;
      default:
          break;
  }

  // Add integer fields to the options div
  fields.forEach(field => {
      const label = document.createElement('label');
      label.textContent = `${field}:`;
      const input = document.createElement('input');
      input.type = 'number';
      input.name = field.replace(/\s+/g, '');
      input.required = true;
      limitOfIndemnityOptions.appendChild(label);
      limitOfIndemnityOptions.appendChild(input);
      limitOfIndemnityOptions.appendChild(document.createElement('br'));
  });

  // Show the limit of indemnity field
  limitOfIndemnityField.style.display = 'block';
}

// Event listener for change event in the line of business field
document.getElementById('lineOfBusiness').addEventListener('change', function () {
  const selectedLineOfBusiness = this.value;
  showLimitOfIndemnityField(selectedLineOfBusiness); // Show the limit of indemnity field based on the selected line of business
});

const insuranceCompanies = [
  "AIG", "ALTIUS", "ATLANTIC", "AXA XL", "BEAZLEY", "CFC", "CHUBB", "CNP", "COSMOS", "CROMAR",
  "DUAL", "ERGO", "ETHNIKI", "EUROLIFE", "EUROPA", "EVEREST", "GENERALI", "GIC", "GROUPAMA", 
  "HARTFORD", "HDI", "HOWDEN UK", "INTERAMERICAN", "INTERASCO", "INTERLIFE", "KENTRIKI", 
  "LIBERTY DUBAI", "LIBERTY HOLLAND", "LIBERTY ITALIA", "MARKEL", "MCI", "MINERVA", "MINETTA", 
  "NEWLINE", "NP", "ORIZON", "PANCYPRIAN", "QBE", "SWISS RE", "TOKIO MARINE", "TRUST", 
  "WESTFIELD SPECIALTY", "YDROGIOS"
];

// Function to populate select element with options
function populateSelect(selectId, options) {
  const select = document.getElementById(selectId);
  
  // Add null option
  const nullOption = document.createElement('option');
  nullOption.value = '';
  nullOption.textContent = 'Select an option';
  select.appendChild(nullOption);

  // Add options
  options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
  });
}

// Populate select elements with options
populateSelect('insuranceCompany', insuranceCompanies);
populateSelect('cedant', insuranceCompanies);
populateSelect('reinsuranceCompany', insuranceCompanies);

// Function to show the insurance company or cedant and reinsurance company fields
function showInsuranceOrCedantFields() {
  const type = document.querySelector('input[name="type"]:checked').value;
  const turnoverValue = document.getElementById('turnover').value.trim();
  if (turnoverValue !== '') {
      if (type === 'insurance') {
          document.getElementById('insuranceCompanyField').style.display = 'block';
          document.getElementById('cedantField').style.display = 'none';
          document.getElementById('reinsuranceCompanyField').style.display = 'none';
      } else if (type === 'reinsurance') {
          document.getElementById('cedantField').style.display = 'block';
          document.getElementById('reinsuranceCompanyField').style.display = 'block';
          document.getElementById('insuranceCompanyField').style.display = 'none';
      }
      document.getElementById('limitOfIndemnityField').style.display = 'block'; // Show the limit of indemnity field
  }
}

// Event listener for keyup event in the turnover field
document.getElementById('turnover').addEventListener('keyup', function () {
  showInsuranceOrCedantFields(); // Show the insurance company or cedant and reinsurance company fields
});

// Function to show the Underwriter field
function showUnderwriterField() {
  document.getElementById('underwriterField').style.display = 'block';
  document.getElementById('underwriter').focus();
}

// Event listener for change event in the insurance company field
document.getElementById('insuranceCompany').addEventListener('change', function () {
  showUnderwriterField(); // Show the Underwriter field
});

// Event listener for change event in the cedant field
document.getElementById('cedant').addEventListener('change', function () {
  showUnderwriterField(); // Show the Underwriter field
});

// Event listener for change event in the reinsurance company field
document.getElementById('reinsuranceCompany').addEventListener('change', function () {
  showUnderwriterField(); // Show the Underwriter field
});

// Function to show the offer accepted field and reason for rejection field
function showOfferAcceptedField() {
  document.getElementById('offerAcceptedField').style.display = 'block';
  document.getElementById('offerAcceptedYes').focus();
}

// Event listener for Enter key press in the underwriter field
document.getElementById('underwriter').addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && this.value.trim() !== '') {
      event.preventDefault(); // Prevent form submission
      showOfferAcceptedField(); // Show the offer accepted field
  }
});

// Function to show the reason for rejection field if offer is not accepted
function showOfferRejectedReasonField() {
  const offerAcceptedNo = document.getElementById('offerAcceptedNo');
  if (offerAcceptedNo.checked) {
      document.getElementById('offerRejectedReasonField').style.display = 'block';
      document.getElementById('offerRejectedReason').focus();
  } else {
      document.getElementById('offerRejectedReasonField').style.display = 'none';
  }
}

// Event listener for change event in the offer accepted field
document.querySelectorAll('input[name="offerAccepted"]').forEach(function (radioButton) {
  radioButton.addEventListener('change', function () {
      showOfferRejectedReasonField(); // Show reason for rejection field if offer is not accepted
  });
});

// Function to show the premium field
function showPremiumField() {
  document.getElementById('premiumField').style.display = 'block';
  document.getElementById('premium').focus();
}

// Event listener for Enter key press in the offer accepted field
document.querySelectorAll('input[name="offerAccepted"]').forEach(function (radioButton) {
  radioButton.addEventListener('change', function () {
      if (this.value === 'yes') {
          showPremiumField(); // Show the premium field if offer is accepted
      }
  });
});

// Function to calculate the rate and show the calculated box
function calculateRateAndShowCalculatedBox() {
  const premium = parseInt(document.getElementById('premium').value);
  const turnover = parseInt(document.getElementById('turnover').value);

  if (!isNaN(premium) && !isNaN(turnover) && turnover !== 0) {
      const rate = (premium * 1000) / turnover;
      document.getElementById('calculatedBox').value = rate.toFixed(2);
      document.getElementById('calculatedBoxField').style.display = 'block';
  } else {
      // If premium or turnover is not a number or turnover is zero, hide the calculated box
      document.getElementById('calculatedBoxField').style.display = 'none';
  }
}

// Event listener for Enter key press in the premium field
document.getElementById('premium').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      calculateRateAndShowCalculatedBox(); // Calculate rate and show the calculated box
  }
});

// Function to show the premium field
function showPremiumField() {
  document.getElementById('premiumField').style.display = 'block';
  document.getElementById('premium').focus();
  
  // Show the submit button
  document.getElementById('submitBtnField').style.display = 'block';
}



// Function to show the submit button
function showSubmitButton() {
  const premiumInput = document.getElementById('premium');
  const submitBtnField = document.getElementById('submitBtnField');
  
  if (premiumInput.value.trim() !== '') {
      submitBtnField.style.display = 'block'; // Show the submit button
  }
}

// Event listener for keyup event in the premium field
document.getElementById('premium').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
      showSubmitButton(); // Show the submit button
  }
});




// Event listener for keyup event in the premium field
document.getElementById('premium').addEventListener('keyup', function (event) {
  if (event.key === 'Enter' && this.value.trim() !== '') {
      showSubmitButton(); // Show the submit button
  }
});

// Event listener for focusing on the "Offer Accepted" radio buttons
document.querySelectorAll('input[name="offerAccepted"]').forEach(function (radioButton) {
  radioButton.addEventListener('focus', function () {
      const premiumInput = document.getElementById('premium');
      if (premiumInput.value.trim() !== '') {
          showSubmitButton(); // Show the submit button
      }
  });
});

// Event listener for Enter key press in the premium field
document.getElementById('premium').addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && this.value.trim() !== '' && !isNaN(this.value.trim())) {
      event.preventDefault(); // Prevent form submission
      showSubmitButton(); // Show the submit button
  }
});


// Function to convert Greek letters to English letters
function convertGreekToEnglish(text) {
  const greekToEnglishMap = {
      'Α': 'A', 'α': 'a',
      'Β': 'B', 'β': 'b',
      'Γ': 'G', 'γ': 'g',
      'Δ': 'D', 'δ': 'd',
      'Ε': 'E', 'ε': 'e',
      'Ζ': 'Z', 'ζ': 'z',
      'Η': 'H', 'η': 'h',
      'Θ': 'Th', 'θ': 'th',
      'Ι': 'I', 'ι': 'i',
      'Κ': 'K', 'κ': 'k',
      'Λ': 'L', 'λ': 'l',
      'Μ': 'M', 'μ': 'm',
      'Ν': 'N', 'ν': 'n',
      'Ξ': 'X', 'ξ': 'x',
      'Ο': 'O', 'ο': 'o',
      'Π': 'P', 'π': 'p',
      'Ρ': 'R', 'ρ': 'r',
      'Σ': 'S', 'σ': 's', 'ς': 's',
      'Τ': 'T', 'τ': 't',
      'Υ': 'Y', 'υ': 'y',
      'Φ': 'F', 'φ': 'f',
      'Χ': 'Ch', 'χ': 'ch',
      'Ψ': 'Ps', 'ψ': 'ps',
      'Ω': 'W', 'ω': 'w'
  };

  return text.replace(/[Α-ω]/g, match => greekToEnglishMap[match] || match);
}

// Add an event listener to the form submission
document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Convert Greek letters to English before submitting the form
  const formInputs = document.querySelectorAll('input[type="text"], textarea');
  formInputs.forEach(input => {
      input.value = convertGreekToEnglish(input.value);
  });

  // Call function to save form data to MongoDB
  saveFormData()
      .then(function(success) {
          if (success) {
              alert('Form submitted correctly!');
              window.location.href = '/'; // Redirect to homepage
          } else {
              alert('Something went wrong, the form wasn\'t saved. Please try again.');
              window.location.reload(); // Refresh the page
          }
      });
});

async function saveFormData() {
  const formData = new FormData(document.getElementById('userForm'));
  const formDataObject = {};
  formData.forEach((value, key) => {
      formDataObject[key] = value;
  });

  try {
      const response = await fetch('/saveFormData', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObject),
      });
      if (response.ok) {
          return true; // Form submitted successfully
      } else {
          console.error('Failed to save form data:', response.statusText);
          return false; // Form submission failed
      }
  } catch (error) {
      console.error('Error saving form data:', error);
      return false; // Form submission failed
  }
}
document.addEventListener('DOMContentLoaded', function () {
  // Your JavaScript code here
  document.getElementById('account').addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevent form submission
          showCountryField(); // Show the country field
      }
  });
});

