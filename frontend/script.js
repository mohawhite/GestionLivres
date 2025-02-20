document.addEventListener('DOMContentLoaded', () => {
    // Éléments du DOM
    const bookList = document.getElementById('book-list');
    const alertContainer = document.getElementById('alert-container');
    const addBookForm = document.getElementById('add-book-form');
    const submitBookBtn = document.getElementById('submit-book');
    const categoryFilter = document.getElementById('category-filter');
    const filterButton = document.getElementById('filter-button');

    // Initialiser les modals Bootstrap
    const deleteConfirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    const addBookModal = new bootstrap.Modal(document.getElementById('addBookModal'));

    // Variable pour stocker l'ID du livre à supprimer
    let bookToDeleteId = null;

    // Fonction pour charger les livres
    const loadBooks = (category = '') => {
        // Afficher un spinner de chargement
        bookList.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Chargement...</span>
                </div>
            </div>
        `;

        // Construire l'URL avec filtrage si nécessaire
        const url = category ? `/api/books?category=${encodeURIComponent(category)}` : '/api/books';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(books => {
                displayBooks(books);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des livres:', error);
                bookList.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <i class="bi bi-exclamation-triangle-fill me-2"></i>
                            Impossible de charger les livres. Veuillez réessayer plus tard.
                        </div>
                    </div>
                `;
            });
    };

    // Fonction pour afficher les livres
    const displayBooks = (books) => {
        bookList.innerHTML = '';

        if (books.length === 0) {
            bookList.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info" role="alert">
                        <i class="bi bi-info-circle-fill me-2"></i>
                        Aucun livre trouvé pour cette catégorie.
                    </div>
                </div>
            `;
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'col-md-6 col-lg-4';
            bookCard.innerHTML = `
                <div class="card book-card">
                    <div class="card-header d-flex justify-content-between align-items-start">
                        <div>
                            <span class="book-category">${escapeHtml(book.category)}</span>
                            <p class="book-year mb-0"><i class="bi bi-calendar me-1"></i>${book.publication_year || 'N/A'}</p>
                        </div>
                        <span class="book-price">${book.price ? formatPrice(book.price) : 'N/A'}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${escapeHtml(book.title)}</h5>
                        <p class="book-author">Par ${escapeHtml(book.author)}</p>
                        <p class="book-description">${book.description ? escapeHtml(book.description) : 'Aucune description disponible.'}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline-danger btn-sm delete-btn" 
                                data-id="${book.id}" 
                                data-title="${escapeHtml(book.title)}"
                                data-author="${escapeHtml(book.author)}">
                            <i class="bi bi-trash me-1"></i>Supprimer
                        </button>
                    </div>
                </div>
            `;
            bookList.appendChild(bookCard);
        });

        // Ajouter les écouteurs d'événements pour les boutons de suppression
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const title = e.currentTarget.dataset.title;
                const author = e.currentTarget.dataset.author;

                bookToDeleteId = id;
                document.getElementById('book-to-delete-title').textContent = title;
                document.getElementById('book-to-delete-author').textContent = `par ${author}`;

                deleteConfirmModal.show();
            });
        });
    };

    // Fonction pour supprimer un livre
    const deleteBook = (id) => {
        fetch(`/api/books/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                // Recharger la liste des livres après suppression
                const currentCategory = categoryFilter.value;
                loadBooks(currentCategory);
                showAlert('Livre supprimé avec succès', 'success');
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du livre:', error);
                showAlert('Erreur lors de la suppression du livre. Veuillez réessayer.', 'danger');
            })
            .finally(() => {
                deleteConfirmModal.hide();
            });
    };

    // Fonction pour ajouter un livre
    const addBook = () => {
        const formData = {
            title: document.getElementById('title').value.trim(),
            author: document.getElementById('author').value.trim(),
            category: document.getElementById('category').value.trim(),
            publication_year: document.getElementById('publication_year').value ? parseInt(document.getElementById('publication_year').value) : null,
            price: document.getElementById('price').value ? parseFloat(document.getElementById('price').value) : null,
            description: document.getElementById('description').value.trim() || null
        };

        // Validation côté client
        if (!formData.title || !formData.author || !formData.category) {
            showAlert('Veuillez remplir tous les champs obligatoires', 'warning');
            return;
        }

        fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                // Réinitialiser le formulaire
                addBookForm.reset();

                // Fermer la modal
                addBookModal.hide();

                // Recharger la liste des livres
                const currentCategory = categoryFilter.value;
                loadBooks(currentCategory);

                showAlert('Livre ajouté avec succès', 'success');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du livre:', error);
                showAlert('Erreur lors de l\'ajout du livre. Veuillez réessayer.', 'danger');
            });
    };

    // Fonction pour afficher des alertes
    const showAlert = (message, type) => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type} alert-dismissible fade show`;
        alertElement.innerHTML = `
            ${type === 'success' ? '<i class="bi bi-check-circle-fill me-2"></i>' :
            type === 'danger' ? '<i class="bi bi-exclamation-triangle-fill me-2"></i>' :
                type === 'warning' ? '<i class="bi bi-exclamation-circle-fill me-2"></i>' :
                    '<i class="bi bi-info-circle-fill me-2"></i>'}
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Créer le conteneur d'alertes s'il n'existe pas déjà
        if (!document.querySelector('.alert-container')) {
            const container = document.createElement('div');
            container.className = 'alert-container';
            document.body.appendChild(container);
        }

        const alertContainer = document.querySelector('.alert-container');
        alertContainer.appendChild(alertElement);

        // Faire disparaître l'alerte après 5 secondes
        setTimeout(() => {
            alertElement.classList.add('fade-out');
            setTimeout(() => {
                alertElement.remove();
            }, 500);
        }, 5000);
    };

    // Fonction pour échapper les caractères HTML dangereux
    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    // Fonction pour formater le prix
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    // Écouteurs d'événements
    filterButton.addEventListener('click', () => {
        const selectedCategory = categoryFilter.value;
        loadBooks(selectedCategory);
    });

    submitBookBtn.addEventListener('click', addBook);

    document.getElementById('confirm-delete').addEventListener('click', () => {
        if (bookToDeleteId) {
            deleteBook(bookToDeleteId);
        }
    });

    // Réinitialiser le formulaire d'ajout quand la modal est fermée
    document.getElementById('addBookModal').addEventListener('hidden.bs.modal', () => {
        addBookForm.reset();
    });

    // Charger les livres au chargement de la page
    loadBooks();
});