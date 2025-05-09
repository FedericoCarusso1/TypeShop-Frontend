import { Col, Container, Image, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import './footer.css';
import logo from '../../logo.png';

const DownFooter = () => {
  return (
    <footer id='footer' className='mt-auto'>
      <div className='footer-top'>
        <Container>
          <Row>
            <Col lg={3} md={6} xs={12} className='footer-contact'>
              <h3>
                <Image width={100} src={logo} alt='' />
              </h3>
              <p>
                A real city
                <br />
                A real stret 999
                <br />
                World
                <br />
                <br />
                <strong>Phone:</strong> 1128661345
                <br />
                <strong>Email:</strong> developer.basilorien@gmail.com
                <br />
                <br />
                <i>"D'oh!" - Homer Simpson</i>
              </p>
            </Col>
            <Col lg={2} md={6} xs={6} className='footer-links'>
              <h4 className="text-primary">Useful Links</h4>
              <ul>
                <li>
                  <i className='bx bx-chevron-right' /> <a href='#'>Home</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' /> <a href='#'>About Us</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' /> <a href='#'>Services</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Terms of Service</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Privacy Policy</a>
                </li>
              </ul>
            </Col>
            <Col lg={3} md={6} xs={6} className='footer-links'>
              <h4 className="text-success">Our Services</h4>
              <ul>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Web Design</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Web Development</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Product Management</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Marketing</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Graphic Design</a>
                </li>
              </ul>
            </Col>
            <Col lg={4} md={6} className='footer-newsletter'>
              <h4 className="text-danger">Join Our Newsletter</h4>
              <p>
                "I’m not a bad guy! I work hard, and I love my kids. So why should I get such a hard time?" - Homer Simpson
              </p>
              <form onSubmit={() => toast.success('Thanks for your subscription!')}>
                <input
                  type='email'
                  required
                  placeholder='email@domain.com'
                  name='email'
                />
                <input type='submit' defaultValue='Subscribe' />
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default DownFooter;
