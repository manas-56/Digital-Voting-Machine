let trsVotes = 0;
        let bjpVotes = 0;
        let congressVotes = 0;
        let cpiVotes = 0;

        const nominees = [
            { id: 1, name: 'TRS' },
            { id: 2, name: 'BJP' },
            { id: 3, name: 'CONGRESS' },
            { id: 4, name: 'CPI' }
        ];

        function createNomineeCards() {
            const nomineeList = document.getElementById('nominee-list');
            nomineeList.innerHTML = '';

            nominees.forEach(nominee => {
                const card = document.createElement('div');
                card.className = 'nominee-card';
                card.textContent = nominee.name;
                card.dataset.id = nominee.id;
                card.onclick = () => selectNominee(nominee.id);

                nomineeList.appendChild(card);
            });
        }

        function selectNominee(selectedId) {
            const nomineeCards = document.querySelectorAll('.nominee-card');

            nomineeCards.forEach(card => {
                card.classList.remove('selected');
            });

            // const selectedCard = document.querySelector(.nominee-card[data-id="${selectedId}"]);
            const selectedCard = document.querySelector(`.nominee-card[data-id="${selectedId}"]`);

            selectedCard.classList.add('selected');
        }

        function submitVote() {
            const voterId = document.getElementById('voterId').value;
            const voterName = document.getElementById('voterName').value;
            const selectedCard = document.querySelector('.nominee-card.selected');

            if (!selectedCard) {
                alert('Please choose a nominee.');
                return;
            }

            const nomineeId = selectedCard.dataset.id;

            // Simulate server request to check if the user already voted

            // Update votes based on the selected nominee
            switch (nomineeId) {
                case '1':
                    trsVotes++;
                    break;
                case '2':
                    bjpVotes++;
                    break;
                case '3':
                    congressVotes++;
                    break;
                case '4':
                    cpiVotes++;
                    break;
            }

            // Display results

            document.getElementById('trsVotes').innerText = `TRS Votes: ${trsVotes}`;
            document.getElementById('bjpVotes').innerText = `BJP Votes: ${bjpVotes}`;
            document.getElementById('congressVotes').innerText = `Congress Votes: ${congressVotes}`;
            document.getElementById('cpiVotes').innerText = `CPI Votes: ${cpiVotes}`;


            // Show the results section
            document.getElementById('results').classList.remove('hidden');

            // Determine the winners
            const maxVotes = Math.max(trsVotes, bjpVotes, congressVotes, cpiVotes);
            const winners = nominees.filter(nominee => {
                return nominee.id === 1 && trsVotes === maxVotes ||
                       nominee.id === 2 && bjpVotes === maxVotes ||
                       nominee.id === 3 && congressVotes === maxVotes ||
                       nominee.id === 4 && cpiVotes === maxVotes;
            }).map(nominee => nominee.name);

            document.getElementById('winners').innerText = `Winner(s): ${winners.join(', ')}`;

        }

        // Initial setup
        createNomineeCards();