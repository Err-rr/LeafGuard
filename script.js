
        const URL = "https://teachablemachine.withgoogle.com/models/UAIniK_gb/";
        let model, webcam, labelContainer, maxPredictions;
        let isWebcamMode = false;

        const classIcons = {
            'Healthy': '<svg width="28" height="28" viewBox="0 0 24 24" fill="#4CAF50"><path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2M6.5,12.5L7.5,14.5L9.5,13.5L7.5,12.5L6.5,12.5M16.5,12.5L15.5,14.5L13.5,13.5L15.5,12.5L16.5,12.5Z"/></svg>',
            'Powdery': '<svg width="28" height="28" viewBox="0 0 24 24" fill="#FFC107"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/></svg>',
            'Rust': '<svg width="28" height="28" viewBox="0 0 24 24" fill="#FF5722"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/></svg>'
        };

        async function loadModel() {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
            
            document.getElementById("label-container").innerHTML = '<div class="loading">Loading model...</div>';
            
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            
            labelContainer = document.getElementById("label-container");
            labelContainer.innerHTML = '';
        }

        async function startWebcam() {
            if (!model) await loadModel();
            
            isWebcamMode = true;
            document.getElementById("modeIndicator").textContent = "Camera Active";
            document.getElementById("webcam-container").classList.remove("hidden");
            document.getElementById("image-container").classList.add("hidden");
            document.getElementById("uploadArea").classList.add("hidden");
            document.getElementById("refreshButton").classList.add("visible");
            
            const flip = true;
            webcam = new tmImage.Webcam(200, 200, flip);
            await webcam.setup();
            await webcam.play();
            window.requestAnimationFrame(loop);
            
            const container = document.getElementById("webcam-container");
            container.innerHTML = '';
            container.appendChild(webcam.canvas);
        }

        async function handleImageUpload(event) {
            if (!model) await loadModel();
            
            const file = event.target.files[0];
            if (file) {
                isWebcamMode = false;
                document.getElementById("modeIndicator").textContent = "Image Analysis";
                document.getElementById("webcam-container").classList.add("hidden");
                document.getElementById("image-container").classList.remove("hidden");
                document.getElementById("uploadArea").classList.add("hidden");
                document.getElementById("refreshButton").classList.add("visible");
                
                if (webcam) {
                    webcam.stop();
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.onload = function() {
                        const container = document.getElementById("image-container");
                        container.innerHTML = '';
                        container.appendChild(img);
                        predictImage(img);
                    };
                };
                reader.readAsDataURL(file);
            }
        }

        function resetToUpload() {
            isWebcamMode = false;
            
            // Stop webcam if running
            if (webcam) {
                webcam.stop();
            }
            
            // Reset UI
            document.getElementById("modeIndicator").textContent = "";
            document.getElementById("webcam-container").classList.add("hidden");
            document.getElementById("image-container").classList.add("hidden");
            document.getElementById("uploadArea").classList.remove("hidden");
            document.getElementById("refreshButton").classList.remove("visible");
            
            // Clear file input
            document.getElementById("imageInput").value = "";
            
            // Reset results
            document.getElementById("label-container").innerHTML = '<div class="loading">Choose camera or upload an image to start detection</div>';
        }

        async function predictImage(imageElement) {
            const prediction = await model.predict(imageElement);
            updateResults(prediction);
        }

        function updateResults(prediction) {
            labelContainer.innerHTML = '';
            for (let i = 0; i < maxPredictions; i++) {
                const className = prediction[i].className;
                const percentage = Math.round(prediction[i].probability * 100);
                
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result-item';
                
                const icon = classIcons[className] || classIcons['Healthy'];
                
                resultDiv.innerHTML = `
                    <div class="result-icon">${icon}</div>
                    <div class="result-content">
                        <span class="result-label">${className}:</span>
                        <span class="result-percentage">${percentage}%</span>
                    </div>
                `;
                
                labelContainer.appendChild(resultDiv);
            }
        }

        async function loop() {
            if (isWebcamMode && webcam) {
                webcam.update();
                const prediction = await model.predict(webcam.canvas);
                updateResults(prediction);
                window.requestAnimationFrame(loop);
            }
        }

        // Drag and drop functionality
        const uploadArea = document.getElementById('uploadArea');
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                    document.getElementById('imageInput').files = files;
                    handleImageUpload({ target: { files: [file] } });
                }
            }
        });