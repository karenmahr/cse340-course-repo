CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organizations(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES
(1, 'Park Cleanup', 'Community members clean the local park.', 'Salt Lake City', '2026-06-01'),
(1, 'Food Drive', 'Collecting non-perishable food for families in need.', 'Salt Lake City', '2026-06-10'),
(1, 'Tree Planting', 'Volunteers plant trees in public spaces.', 'Provo', '2026-06-15'),
(1, 'School Supply Donation', 'Providing school materials to students.', 'Ogden', '2026-07-05'),
(1, 'Neighborhood Beautification', 'Painting fences and cleaning streets.', 'Logan', '2026-07-20'),
(2, 'Beach Cleanup', 'Removing trash from the beach area.', 'Santa Monica', '2026-06-03'),
(2, 'Clothing Donation', 'Collecting clothes for homeless shelters.', 'Los Angeles', '2026-06-12'),
(2, 'Community Garden', 'Building and maintaining a local garden.', 'Pasadena', '2026-06-18'),
(2, 'Senior Center Visit', 'Volunteers spend time with seniors.', 'Burbank', '2026-07-02'),
(2, 'Blood Donation Campaign', 'Encouraging blood donations.', 'Glendale', '2026-07-15'),
(3, 'River Cleanup', 'Cleaning trash from the river banks.', 'Denver', '2026-06-05'),
(3, 'Youth Tutoring', 'Helping students with homework and studies.', 'Aurora', '2026-06-14'),
(3, 'Animal Shelter Support', 'Helping care for rescued animals.', 'Lakewood', '2026-06-22'),
(3, 'Food Kitchen Volunteering', 'Preparing meals for those in need.', 'Boulder', '2026-07-08'),
(3, 'Community Health Fair', 'Providing free health resources.', 'Fort Collins', '2026-07-25');

SELECT * FROM service_projects;

CREATE TABLE categories(
    categories_id SERIAL PRIMARY KEY,
    categories_name VARCHAR(150) NOT NULL;
)

INSERT INTO categories (categories_id, categories_name)
VALUES
("Environmental"),
("Educational"),
("Community Service"),
("Health and Wellness");

SELECT * FROM categories;

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
	role_description TEXT
);

INSERT INTO roles (role_name, role_description)
VALUES
	('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');
SELECT * FROM roles;

CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	role_id INTEGER REFERENCES roles(role_id),
	creates_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a test user
INSERT INTO users (name, email, password_hash, role_id) 
VALUES ('testuser', 'test@example.com', 'placeholder_hash', 1);

-- Join users and roles to see complete information
SELECT u.user_id, u.name, u.email, r.role_name, r.role_description
FROM users u
JOIN roles r ON u.role_id = r.role_id;

-- Delete the test user
DELETE FROM users WHERE email = 'test@example.com';

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES
(1, 'Park Cleanup', 'Community members clean the local park.', 'Salt Lake City', '2026-06-01'),
(1, 'Food Drive', 'Collecting non-perishable food for families in need.', 'Salt Lake City', '2026-06-10'),
(1, 'Tree Planting', 'Volunteers plant trees in public spaces.', 'Provo', '2026-06-15'),
(1, 'School Supply Donation', 'Providing school materials to students.', 'Ogden', '2026-07-05'),
(1, 'Neighborhood Beautification', 'Painting fences and cleaning streets.', 'Logan', '2026-07-20'),
(2, 'Beach Cleanup', 'Removing trash from the beach area.', 'Santa Monica', '2026-06-03'),
(2, 'Clothing Donation', 'Collecting clothes for homeless shelters.', 'Los Angeles', '2026-06-12'),
(2, 'Community Garden', 'Building and maintaining a local garden.', 'Pasadena', '2026-06-18'),
(2, 'Senior Center Visit', 'Volunteers spend time with seniors.', 'Burbank', '2026-07-02'),
(2, 'Blood Donation Campaign', 'Encouraging blood donations.', 'Glendale', '2026-07-15'),
(3, 'River Cleanup', 'Cleaning trash from the river banks.', 'Denver', '2026-06-05'),
(3, 'Youth Tutoring', 'Helping students with homework and studies.', 'Aurora', '2026-06-14'),
(3, 'Animal Shelter Support', 'Helping care for rescued animals.', 'Lakewood', '2026-06-22'),
(3, 'Food Kitchen Volunteering', 'Preparing meals for those in need.', 'Boulder', '2026-07-08'),
(3, 'Community Health Fair', 'Providing free health resources.', 'Fort Collins', '2026-07-25');

SELECT * FROM service_projects;

CREATE TABLE categories(
    categories_id SERIAL PRIMARY KEY,
    categories_name VARCHAR(150) NOT NULL
)

INSERT INTO categories (categories_id, categories_name)
VALUES
(1,'Environmental'),
(2, 'Educational'),
(3, 'Community Service'),
(4, 'Health and Wellness');

SELECT * FROM categories;

UPDATE users
SET role_id = 2
WHERE email = 'admin@example.com';

UPDATE users SET role_id = (SELECT role_id FROM roles WHERE role_name = 'admin') WHERE email = 'admin@example.com';
SELECT users.user_id, users.email, roles.role_name FROM users JOIN roles ON users.role_id = roles.role_id;

CREATE TABLE registered_users (
    user_id INT REFERENCES users(user_id),
    project_id INT REFERENCES service_projects(project_id),
    PRIMARY KEY (user_id, project_id)
);

CREATE TABLE project_categories (
    project_id INT REFERENCES service_projects(project_id),
    categories_id INT REFERENCES categories(categories_id),
    PRIMARY KEY (project_id, categories_id)
);