import { Router } from 'express';
import ldap from 'ldapjs';

const v1Router: Router = Router();

v1Router.get('/', (req, res) => res.json({ hello: req.query.name || 'World' }));

v1Router.get('/ldapjs/crl', async (req, res) => {
  const ldapClient = [
    {
      url: 'ldap://35.165.176.34:389',
      accounts: [
        {
          dn: 'CN=Administrator,CN=Users,DC=ballotbr,DC=libra',
          pwd: 'FN)kJ8!WM3%8vC23%uf=2;P?5)TIS.x*',
        },
      ],
    },
    {
      url: 'ldap://139.82.24.46:389/DC=libra,DC=petrobras',
      accounts: [
        {
          dn: 'CN=Administrator,CN=Users,DC=libra,DC=petrobras',
          pwd: 'CALibra2021!',
        },
      ],
    },
  ];
  const ldapUrlIndex = 0;
  const ldapBindAccoundIndex = 0;

  const client = ldap.createClient({
    url: ldapClient[ldapUrlIndex]?.url!,
  });

  client.bind(
    ldapClient[ldapUrlIndex]?.accounts[ldapBindAccoundIndex]?.dn!,
    ldapClient[ldapUrlIndex]?.accounts[ldapBindAccoundIndex]?.pwd!,
    (error, _result) => {
      if (error) res.status(502).json(error);
    },
  );

  client.search(
    `CN=ca,CN=LIBRA-WS,CN=CDP,CN=Public Key Services,CN=Services,CN=Configuration,DC=ballotbr,DC=libra`,
    {},
    (error, result) => {
      if (error) res.status(502).json(error);
      const responseObject: Record<string, any> = {};
      result.on('searchEntry', entry => {
        responseObject.searchEntry = entry.object;
        const { certificateRevocationList } = responseObject.searchEntry;
        const crlBinary = Buffer.from(certificateRevocationList, 'binary');
        console.log(
          `-----BEGIN X509 CRL-----${crlBinary.toString(
            'base64',
          )}-----END X509 CRL-----`,
        );
      });
      result.on('searchReference', referral => {
        responseObject.searchReference = referral;
        console.log('referral: ' + referral.uris.join());
      });
      result.on('error', err => {
        console.error('error: ' + err.message);
        res.status(502).json(err);
      });
      result.on('end', result => {
        console.log('status: ' + result?.status);
        res.status(200).json(responseObject);
      });
    },
  );
  client.unbind();
});

v1Router.get('/ldapjs', async (req, res) => {
  const ldapClient = [
    {
      url: 'ldap://35.165.176.34:389',
      accounts: [
        {
          dn: 'CN=Administrator,CN=Users,DC=ballotbr,DC=libra',
          pwd: 'FN)kJ8!WM3%8vC23%uf=2;P?5)TIS.x*',
        },
      ],
    },
    {
      url: 'ldap://139.82.24.46:389/DC=libra,DC=petrobras',
      accounts: [
        {
          dn: 'CN=Administrator,CN=Users,DC=libra,DC=petrobras',
          pwd: 'CALibra2021!',
        },
      ],
    },
  ];
  const ldapUrlIndex = 0;
  const ldapBindAccoundIndex = 0;

  const client = ldap.createClient({
    url: ldapClient[ldapUrlIndex]?.url!,
  });

  client.bind(
    ldapClient[ldapUrlIndex]?.accounts[ldapBindAccoundIndex]?.dn!,
    ldapClient[ldapUrlIndex]?.accounts[ldapBindAccoundIndex]?.pwd!,
    (error, _result) => {
      if (error) res.status(502).json(error);
    },
  );

  client.search(
    `CN=ca,CN=LIBRA-WS,CN=CDP,CN=Public Key Services,CN=Services,CN=Configuration,DC=ballotbr,DC=libra`,
    {},
    (error, result) => {
      if (error) res.status(502).json(error);
      const responseObject: Record<string, any> = {};
      result.on('searchEntry', entry => {
        responseObject.searchEntry = entry.object;
        console.log('entry: ' + JSON.stringify(entry.object));
      });
      result.on('searchReference', referral => {
        responseObject.searchReference = referral;
        console.log('referral: ' + referral.uris.join());
      });
      result.on('error', err => {
        console.error('error: ' + err.message);
        res.status(502).json(err);
      });
      result.on('end', result => {
        console.log('status: ' + result?.status);
        res.status(200).json(responseObject);
      });
    },
  );
  client.unbind();
});
export default v1Router;
