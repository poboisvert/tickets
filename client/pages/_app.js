import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  // Git
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className='container'>
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};
// NGINX
AppComponent.getInitialProps = async (appContext) => {
  //console.log(appContext);

  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  console.log(pageProps);

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
