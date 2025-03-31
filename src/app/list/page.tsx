import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Contact } from '@/lib/validationSchemas'; // Import the Contact interface from validationSchemas
import ContactCard from '@/components/ContactCard'; // Import the ContactCard component to display each contact

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const contacts: Contact[] = [{
    firstName: 'Philip', lastName: 'Johnson', address: 'POST 307, University of Hawaii',
    image: 'https://github.com/philipmjohnson.png',
    description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director ' +
    'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
  },
    {
      firstName: 'Henri', lastName: 'Casanova', address: 'POST 307, University of Hawaii',
      image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
      description: 'I am originally from France. I maintain a list of reports from my surf sessions. I have proof ' +
      'that I ran the Hana relay with an actual Team.',
    },
    {
      firstName: 'Kim', lastName: 'Binsted', address: 'POST 307, University of Hawaii',
      image: 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg',
      description: 'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence' +
      'from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of ' +
      'punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as ' +
      '"What do you call a Martian who drinks beer? An ale-ien!".',
    },
  ];

  // console.log(stuff);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">List Contacts</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={contact.firstName + contact.lastName}>
                  <ContactCard contact={contact} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
