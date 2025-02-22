SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS bookdb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE bookdb;

CREATE TABLE IF NOT EXISTS books (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    author VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    category VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    publication_year INT,
    description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    price DECIMAL(10,2)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO books (title, author, category, publication_year, description, price) VALUES
    ('L''Art de la Guerre', 'Sun Tzu', 'Stratégie', -500, 'Un traité de stratégie militaire applicable aux affaires et au leadership', 19.99),
    ('Père Riche, Père Pauvre', 'Robert Kiyosaki', 'Finance Personnelle', 1997, 'Ce que les riches enseignent à leurs enfants à propos de l''argent', 24.50),
    ('De Zéro à Un', 'Peter Thiel', 'Startups', 2014, 'Notes sur les startups ou comment construire le futur', 22.99),
    ('La Semaine de 4 Heures', 'Timothy Ferriss', 'Productivité', 2007, 'Travaillez moins, gagnez plus et vivez mieux', 18.99),
    ('Réfléchissez et Devenez Riche', 'Napoleon Hill', 'Développement Personnel', 1937, 'Comment transformer vos désirs en richesse', 15.50),
    ('L''Entrepreneur Lean', 'Eric Ries', 'Startups', 2011, 'Comment les entrepreneurs utilisent l''innovation continue', 26.99),
    ('Les 7 Habitudes des Gens Efficaces', 'Stephen Covey', 'Développement Personnel', 1989, 'Principes fondamentaux pour réussir personnellement et professionnellement', 29.99),
    ('Influence et Manipulation', 'Robert Cialdini', 'Marketing', 1984, 'Les armes de la persuasion', 21.50),
    ('Tout le Monde n''a pas eu la Chance de Rater ses Études', 'Olivier Roland', 'Entrepreneuriat', 2016, 'Comment devenir entrepreneur et se créer un avenir prospère sans diplôme', 23.99),
    ('Votre Argent compte', 'Robert Kiyosaki', 'Finance Personnelle', 2000, 'La gestion financière au service de la liberté', 17.99),
    ('La Méthode Lean Startup', 'Eric Ries', 'Startups', 2011, 'Comment créer et développer une startup qui réussit', 25.99),
    ('Comment se Faire des Amis', 'Dale Carnegie', 'Relations Humaines', 1936, 'Les techniques pour réussir ses relations professionnelles', 16.50),
    ('L''Éveil de Votre Puissance Intérieure', 'Anthony Robbins', 'Développement Personnel', 1991, 'Comment vivre la vie que vous désirez et méritez', 24.99),
    ('Ogilvy on Advertising', 'David Ogilvy', 'Marketing', 1983, 'Les principes fondamentaux de la publicité', 27.50),
    ('The E-Myth Revisited', 'Michael E. Gerber', 'Entrepreneuriat', 1995, 'Pourquoi la plupart des petites entreprises échouent et que faire', 19.99),
    ('Les 22 Lois du Marketing', 'Al Ries & Jack Trout', 'Marketing', 1993, 'Comprendre les mécanismes du marketing', 23.50),
    ('Deep Work', 'Cal Newport', 'Productivité', 2016, 'Les règles pour réussir dans un monde hyperconnecté', 22.99),
    ('La Puissance de l''Intention', 'Wayne W. Dyer', 'Développement Personnel', 2004, 'Comment développer une intention qui se réalise', 18.50),
    ('Business Model Generation', 'Alexander Osterwalder', 'Stratégie', 2010, 'Un guide pour les visionnaires et les révolutionnaires', 29.99),
    ('Hooked', 'Nir Eyal', 'Marketing', 2014, 'Comment créer des produits qui créent des habitudes', 26.50),
    ('Pitch Anything', 'Oren Klaff', 'Vente', 2011, 'Une méthode innovante pour présenter, persuader et gagner', 24.99),
    ('Le Personal MBA', 'Josh Kaufman', 'Business', 2010, 'La bible du business pour entrepreneurs', 27.99),
    ('Never Split the Difference', 'Chris Voss', 'Négociation', 2016, 'Négocier comme si votre vie en dépendait', 23.50),
    ('Essentialism', 'Greg McKeown', 'Productivité', 2014, 'Faire moins mais mieux', 21.99),
    ('Thinking, Fast and Slow', 'Daniel Kahneman', 'Psychologie', 2011, 'Comment notre esprit prend des décisions', 28.50);