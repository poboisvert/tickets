import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  //console.log(currentUser);
  // axios.get('/api/users/currentuser');
  // ss
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link
            href='http://bonnethood.com/tickets/[ticketId]'
            as={`/tickets/${ticket.id}`}
          >
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  //console.log(req.headers); // cookie for the session will be displayed
  // const response = await axios.get('/api/users/currentuser');
  // k get services -n ingress-nginx

  // https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
  // return response.data;
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
