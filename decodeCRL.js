const fs = require('fs');
const forge = require('node-forge');
// const crypto = require('crypto');
const ldap = require('ldapjs');
const asn1 = require('asn1js');
const pkijs = require('pkijs');
const pvutils = require('pvutils');

const client = ldap.createClient({
  url: "ldap://35.165.176.34:389",
});

// client.bind(
//   'CN=Administrator,CN=Users,DC=ballotbr,DC=libra',
//   'FN)kJ8!WM3%8vC23%uf=2;P?5)TIS.x*',
//   (error, _result) => {
//     if (error) console.error(error)
//   },
// );

// client.search(`CN=ca,CN=LIBRA-WS,CN=CDP,CN=Public Key Services,CN=Services,CN=Configuration,DC=ballotbr,DC=libra`,
//   {},
//   (error, result) => {
//     if (error) res.status(502).json(error);
//     // const responseObject = {};
//     result.on('searchEntry', entry => {
//       // const crlString = entry.json.attributes
//       //   .find(({ type }) => type === 'certificateRevocationList')
//       //   .vals[0]
//       // console.log(Buffer.from(crlString, 'binary'))
//       const { certificateRevocationList } = entry.object;
//       const crlBuffer = Buffer.from(certificateRevocationList);

//       const uint8CrlBuffer = new Uint8Array(crlBuffer).buffer;
//       const asn1crl = asn1.fromBER(uint8CrlBuffer)
//       console.log(asn1crl)
//       const crl = new pkijs.CertificateRevocationList({
//         schema: asn1crl.result
//       })
//       console.log(crl)


//       // console.log(`-----BEGIN X509 CRL-----${Buffer.from(certificateRevocationList, 'binary').toString('base64')}-----END X509 CRL-----`);
//       // const crlBuffer = fs.readFileSync('ca1.crl');
//       // const { certificateRevocationList } = responseObject.searchEntry;
//       // const crlBinary = Buffer.from(certificateRevocationList, 'binary');
//       // console.log(
//       //   `-----BEGIN X509 CRL-----${crlBinary.toString(
//       //     'base64',
//       //   )}-----END X509 CRL-----`,
//       // );
//     });
//     result.on('end', _result => {
//       client.unbind();
//     });
//   }
// )
const crlBuffer = fs.readFileSync('verisign.crl');
const uint8CrlBuffer = new Uint8Array(crlBuffer).buffer;
const asn1crl = asn1.fromBER(uint8CrlBuffer)
const crl = new pkijs.CertificateRevocationList({
  schema: asn1crl.result
})
console.log(crl)
let revokedCertificates = [];
if (crl.revokedCertificates) {
  revokedCertificates = crl.revokedCertificates.map(({ userCertificate }) => pvutils.bufferToHexCodes(userCertificate.valueBlock.valueHex));
}
console.log(revokedCertificates)
