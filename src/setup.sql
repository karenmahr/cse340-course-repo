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