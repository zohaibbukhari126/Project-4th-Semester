document.addEventListener('DOMContentLoaded', () => {
    const dietForm = document.getElementById('diet-form');
    const videoForm = document.getElementById('video-form');
    const dietsContainer = document.getElementById('diets');
    const videosContainer = document.getElementById('videos');

    // Function to render diet programs
    const renderDiets = (diets) => {
        dietsContainer.innerHTML = '';
        diets.forEach(diet => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>${diet.description}</p>
                <button onclick="editDiet(${diet.id}, '${diet.description}')">Edit</button>
                <button onclick="deleteDiet(${diet.id})">Delete</button>
            `;
            dietsContainer.appendChild(div);
        });
    };

    // Function to render videos
    const renderVideos = (videos) => {
        videosContainer.innerHTML = '';
        videos.forEach(video => {
            const div = document.createElement('div');
            div.innerHTML = `
                <iframe width="560" height="315" src="${encodeURIComponent(video.url)}" frameborder="0" allowfullscreen></iframe>
                <button onclick="deleteVideo(${video.id})">Delete</button>
            `;
            videosContainer.appendChild(div);
        });
    };
    
    // Function to fetch and render diet programs
    const fetchDiets = async () => {
        try {
            const response = await axios.get('http://localhost:3000/dietprogram');
            renderDiets(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // Function to fetch and render videos
    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/video');
            renderVideos(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Initial fetching and rendering
 1
    fetchVideos();

    // Event listener for submitting a new diet program
    dietForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = dietForm.querySelector('#description').value;
        try {
            await axios.post('http://localhost:3000/dietprogram', { description });
            dietForm.reset();
            fetchDiets();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Event listener for submitting a new video
    videoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        const url = videoForm.querySelector('#url').value;
        try {
            await axios.post('http://localhost:3000/video', { url });
            videoForm.reset();
            fetchVideos();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Function to delete a diet program
    window.deleteDiet = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/dietprogram/${id}`);
            fetchDiets();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to delete a video
    window.deleteVideo = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/video/${id}`);
            fetchVideos();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to edit a diet program
    window.editDiet = (id, description) => {
        const newDescription = prompt('Enter the new description:', description);
        if (newDescription) {
            axios.put(`http://localhost:3000/dietprogram/${id}`, { description: newDescription })
                .then(() => fetchDiets())
                .catch(error => console.error('Error:', error));
        }
    };

});
