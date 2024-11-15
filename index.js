

        // Text-to-speech function
        function readText() {
            const incidentDetails = document.getElementById('incident-details').value;
            if (incidentDetails) {
                const speech = new SpeechSynthesisUtterance(incidentDetails);
                window.speechSynthesis.speak(speech);
            } else {
                alert("Please enter incident details first.");
            }
        }

        // Change language function
        function changeLanguage() {
            const lang = document.getElementById('languageSelect').value;
            if (lang === 'es') {
                document.getElementById('incident-details').placeholder = 'Describa el incidente...';
                document.getElementById('thankYouMessage').innerHTML = 'Gracias por su informe. Su reporte ha sido recibido y es confidencial.';
            } else {
                document.getElementById('incident-details').placeholder = 'Describe the incident...';
                document.getElementById('thankYouMessage').innerHTML = 'Thank you for your submission. Your report has been received and is confidential.';
            }
        }

        // Function to toggle chatbot visibility with fade effect
        function toggleChatbot() {
            const chatContainer = document.getElementById('chatbotContainer');
            chatContainer.style.display = chatContainer.style.display === 'none' || chatContainer.style.display === '' ? 'block' : 'none';
        }

        // Predefined Responses
        const predefinedReplies = {
            "hello": "Hi! How can I assist you today?",
            "help": "I can help you with financial literacy, resources for survivors of GBV, and anonymous reporting. What would you like to know more about?",
            "resources": "You can find resources such as hotlines, shelters, and legal aid on the 'Resource Directory' page.",
            "financial literacy": "We offer tips on budgeting, creating handmade crafts for income, and finding online job opportunities. Would you like to learn more?",
            "report": "You can report an incident anonymously through the 'Report an Incident' section."
        };

        // Chatbot interactions
        const sendMessageBtn = document.getElementById('sendMessageBtn');
        const chatInput = document.getElementById('chat-input');

        sendMessageBtn.addEventListener('click', function () {
            const userInput = chatInput.value.trim();
            if (userInput) {
                const chatContent = document.querySelector('.chat-content');
                chatContent.innerHTML += `<div class="bg-blue-100 p-3 rounded-lg mb-4">${userInput}</div>`;
                
                // Get predefined or default response
                const response = getPredefinedResponse(userInput);
                chatContent.innerHTML += `<div class="bg-gray-200 p-3 rounded-lg mb-4">${response}</div>`;
                
                chatInput.value = '';
                chatContent.scrollTop = chatContent.scrollHeight;
            }
        });

        chatInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                sendMessageBtn.click();
            }
        });

        // Get predefined response based on user input
        function getPredefinedResponse(userInput) {
            return predefinedReplies[userInput.toLowerCase()] || "I'm sorry, I didn't understand that. Can you please ask something else?";
        }

        // Add a financial chat button with aria-label
        const chatButton = document.createElement('button');
        chatButton.setAttribute('aria-label', 'Open chat with advisor');
        chatButton.classList.add('fixed', 'bottom-4', 'right-4', 'bg-pink-600', 'text-white', 'py-3', 'px-6', 'rounded-full', 'z-50');
        chatButton.innerText = 'Chat with Advisor';
        chatButton.addEventListener('click', toggleChatbot);
        document.body.appendChild(chatButton);

        // Geolocation and nearby services
        function getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showLocation, showError);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        function showLocation(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchNearbyServices(latitude, longitude);
            alert(`Location detected: Latitude ${latitude}, Longitude ${longitude}.`);
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
            }
        }

        // Mock API call to fetch nearby services based on user location
function fetchNearbyServices(latitude, longitude) {
    // Here, replace this mock data with an actual API call if available
    const mockServices = [
        { name: "Local Hotline", description: "Emergency hotline for immediate assistance.", contact: "Call 1-800-123-4567" },
        { name: "Nearby Shelter", description: "Safe shelter available 24/7.", contact: "Visit Shelter ABC" },
        { name: "Legal Aid Center", description: "Free legal services for survivors.", contact: "Contact Legal Aid XYZ" }
    ];

    // Call the function to display these services on the page
    displayServices(mockServices);
}

// Function to display nearby services on the page
function displayServices(services) {
    const servicesContainer = document.getElementById('servicesContainer');
    servicesContainer.innerHTML = '<h3 class="text-lg font-semibold mb-4">Nearby Services</h3>';

    services.forEach(service => {
        servicesContainer.innerHTML += `
            <div class="bg-white p-4 rounded-lg shadow-md mb-4">
                <h4 class="font-semibold text-blue-600">${service.name}</h4>
                <p class="text-gray-700">${service.description}</p>
                <p class="text-blue-500"><a href="tel:${service.contact.split(' ')[1]}" class="underline">${service.contact}</a></p>
            </div>
        `;
    });
}


        function submitReport() {
            const incidentDetails = document.getElementById('incident-details').value.trim();
            if (!incidentDetails) {
                alert("Incident details are required to proceed.");
                return;
            }
            document.getElementById('thankYouMessage').classList.remove('hidden');
            document.getElementById('reportForm').reset();
            alert("Thank you! Your report has been submitted.");
        }
    