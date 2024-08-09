---
title: 'JWTs: what are those and how do they work'
excerpt: 'JWTs, JSON Web Tokens or Tokens, you know them by a lot of names, but in this article we are going to depict them in detail and show you how they work and what is the code to generate them like'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**JWTs**:%20what%20are%20those%20and%20how%20to%20they%20work&images=https://cdn.worldvectorlogo.com/logos/jwt-3.svg'
date: '2024-08-05T18:35:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**JWTs**:%20what%20are%20those%20and%20how%20to%20they%20work&images=https://cdn.worldvectorlogo.com/logos/jwt-3.svg'
---

## Definition

The short definition of a JSON Web Token (or **JWT**) is: a stateless token that stores important information for communication between two parties. According to the [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519), the long definition is: A compact and URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

JWTs are widely used in almost any kind of authentication system to transfer non-sensitive information about a user or his permissions. The structure of a JWT is the following:

```
<header>.<payload>.<signature>
```

It consists of three parts that are equally encoded using the base64url algorithm and separated by a period character (.) at the end of every part. It is encoded as base64 to facilitate the transfer of the token through parties. Here we take a deeper dive into each of the sections mentioned.

### Encoding

Let's talk about the encoding first, the algorithm used in the JWT encoding is called base64url and it is based on an algorithm called base64. The base64 algorithm is a way of bytes-to-text encoding to represent binary data as text using a specific set of letters and numbers. The default set of the base64 algorithm is the following:

```
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
```

The base64 encoding works by doing a series of mathematical operations in each byte of the data you want to encode to transform it into a ASCII code that fits into the set specified above.

There's some alternative versions of the base64 encoding and one of them is the base64url algorithm, this version changes the set a bit to make the base64 encoded info safe to be transmitted in URLs as query params or url params, the set for the base64url is:

```
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_
```

The difference is on the latest two characters that in the default set are `+/` and in the url version they are `-_` because the plus and slash characters can't be used safely in a URL, since they are reserved characters used in the URL, the plus sign is often used in place of the space character to parse strings and the slash character is used to separate the paths of the URL, hence, JWTs use the base64url version of the base64 encoding to make the tokens URL-safe.

### Header

The header of the JWT is compose by claims containing some general information about the token, like the `typ` and `alg` claims. Let's talk about those claims:

- `typ`: this claim usually says what is the media type of the whole JWT. Usually ignored because the object is known to be a JWT already;
- `alg`: usually specifies what is the algorithm used to generate the signing part of the JWT, ex: `HS256`, `RS256` and so on;
- `cty`: content type parameter, it's not recommended in case of no use of nested signing or encryption operations, if they are used, the recommended value is "JWT", to indicate that a nested JWT is enclosed in the JWT in which the `cty` claim is present.

Those are the most common and RFC defined claims that can be used in a JWT, you can define claims on your own but custom claims are usually defined at the payload of the JWT, which is the section we're talking about next.

### Payload

Here you can define virtually any claims you like to be available for transfer between the parties you're communicating with. The JWT RFC specifies some recommended claims to be added in this section, here are they:

- `iss`: issuer claim, usually identifies the issuer of the JWT, it can contain a string or a URI according to the RFC. The processing of this claim usually is application specific;
- `sub`: subject claim, usually identifies the user that the JWT belongs to, it should be locally or globally unique according to the RFC. The processing of this claim usually is application specific;
- `aud`: audience claim, usually identifies the audience that the JWT is intended for, in most cases it's value is a array of strings. The processing of this claim usually is to check if the principal processing the claim identifies itself with one of the values present on the audience, if not, the JWT must be rejected;
- `exp`: expiration claim, usually is a unix timestamp indicating when the JWT is intended to expire, a token without this claim is considered to be non-expiring. The processing of this claim should validate if the current date/time is before the expiration claim time, if it's not, the JWT should be rejected;
- `nbf`: not before claim, usually a unix timestamp indicating when the JWT is intended to be accepted, a token without this claim can be accepted at any time. The processing of this claim should validate if the current date/time is after the not before claim time, if it's not, the JWT should be rejected;
- `iat`: issued at claim, usually a unix timestamp indicating what was the time when the JWT was issued, used to determine the age of the token;
- `jti`: JWT ID claim, provides a unique identifier for a given JWT. It should be locally or globally unique, if you use multiple issuers, collision between issuers should also be accounted for, meaning a for different issuers you can't have the ID repeated.

The values for all the claims listed above are case-sensitive as defined by the RFC. You can create claims based on your preference but they may be subject to collisions with other public claims that can be found in the RFC in [Section 4.1](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1) and [Section 4.2](https://datatracker.ietf.org/doc/html/rfc7519#section-4.2).

### Signature

The signature of a JWT is done by using an algorithm to generate a HMAC (Hash-based Message Authentication Code). Theoretically, an HMAC can be generated using any hash generation algorithm, but there are some algorithms that are used more frequently in JWT generation, these are:

- `HS224` - An HMAC generation based on the SHA224 hash generation algorithm;
- `HS256` - An HMAC generation based on the SHA256 hash generation algorithm;
- `HS512` - An HMAC generation based on the SHA512 hash generation algorithm;
- `RS224` - A RSA signature based on the SHA224 hash generation algorithm;
- `RS256` - A RSA signature based on the SHA256 hash generation algorithm;
- `RS512` - A RSA signature based on the SHA512 hash generation algorithm;

The HMAC ones are fairly simple, it's basically a hash generated with the info inside the token and a secret key and since a cryptographic hash function is a one-way function, you can check your JWT using a hash generated with the same info and key to make sure it's a JWT generated by your own application and not a modified one. For more details on cryptographic hash functions, check out the article on this blog: **[Cryptographic Hash Functions](/en/posts/cryptographic-hash-functions)**.

The RSA ones are more complicated though since RSA is a type of assymetric encryption, a subject that would give us enough to write another whole article about. RSA encryption uses a pair of keys, so you need to have a public and a private key, you sign the JWT with the private key and validate the signature with your public key.

**Note**: NEVER EXPOSE none of the keys you use to sign a JWT, it's very sensitive information and in case of it being exposed, attackers can fake JWTs to get inside your application. ALWAYS use a strong key that's difficult to guess, like a random string generated by some program or a pair of RSA keys. The signature is the only thing making the JWT safe for your application to use.

## Generation

Let's suppose we have the following info to encode inside a JWT:

Header:
```json
{"alg": "HS256","typ": "JWT"}
```

Payload:
```json
{"sub":"@luk3skyw4lker","name": "Lucas","iat":1723033068}
```

How should the process happen to encode those informations and how would they look at the end? The answer is to follow this steps:

1. Define what signing algorithm you will use;
2. Encode the stringified version of the header into a base64url string;
3. Encode the stringified version of the payload into a base64url string;
4. Use the encoded header, encoded payload and the key to generate a HMAC to verify the JWT with according to the algorithm chosen;
5. Encode the signature using the base64url algorithm;
6. Build the token with the parts separated by a period.

At the end of those steps, with the information I have provided above, using the `HS256` algorithm with the key as `secret`, you'd probably get the following JWT:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjMwMzMwNjgsIm5hbWUiOiJMdWNhcyIsInN1YiI6IkBsdWszc2t5dzRsa2VyIn0.3bTdm8791QTFsD0goJAOmZeveNgS1ExSfK8W631C4DU
```

**NOTE:** The order of the string makes a difference in the base64url encoding, you might get a different result depending on which order the header and the payload informations are organized, but essentially, you would get this or a similar JWT if you use the info provided here.

Since the JWT is only base64url encoded, anyone can decode your token and see the the info inside of it, so **NEVER** put any sensitive user info inside the JWT. The only thing making the JWT safe is the signature if your key hasn't been exposed, if it has, please change the key you're using completely, this automatically invalidates all the old JWTs you have generated.

Below is a code example using the **[go-jwt](https://github.com/luk3skyw4lker/go-jwt)** library and the `HS256` signing method:

```go
import (
  "crypto"
  "log"

  "github.com/luk3skyw4lker/go-jwt/signing/hmac"
  "github.com/luk3skyw4lker/go-jwt/utils"
  "github.com/luk3skyw4lker/go-jwt/jwt"
)

// Should pad controls if the base64url encoding should be padded with '='
// according to the JWT spec, the padding is not recommended
// the default value for the option is false internally too.
var shouldPad = false

func main() {
  // It's recommended for sensitive keys to be store as environment variables
  // the name of the key in the environment variable is your choice.
  algorithm := hmac.New(crypto.SHA256, os.Getenv("JWT_SECRET_KEY"))
  generator := jwt.NewGenerator(algorithm, jwt.Options{ShouldPad: shouldPad})

  payload := utils.Must(
    json.Marshal(
      map[string]any{
        "sub":  "@luk3skyw4lker",
        "name": "Lucas",
      },
    ),
  )

  jwt, err := generator.Generate(payload)

  if err != nil {
    panic(err)
  }

  log.Printf("token: %s\n", jwt)

  verified, err := generator.Verify(jwt)
  if err != nil {
    panic(err)
  }

  log.Printf("verified: %s\n", verified)
}
```

This code generates and verifies the JWT at the same time, so the verification output will always be true because the token is generated and verified instantaneously. The internals of the library can be checked completely in the [GitHub repo](https://github.com/luk3skyw4lker/go-jwt) but the basic code to generate the JWT looks like this:

```go
func (g *JWTGenerator) Generate(payload []byte) (string, error) {
  header, err := Base64URLEncoder.EncodeBase64Url(headerInfo)
  if err != nil {
    return "", err
  }

  payload, err := Base64URLEncoder.EncodeBase64Url(payloadInfo)
  if err != nil {
    return "", err
  }

  hmac, err := g.hmac.Sign([]byte(header), []byte(payload))
  if err != nil {
    return "", err
  }

  signature, err := Base64URLEncoder.EncodeBase64Url(hmac)
  if err != nil {
    return "", err
  }

  return fmt.Sprintf("%s.%s.%s", header, payload, signature), nil
}
```

The code basically implements the steps specified earlier on encoding the header, encoding the payload, generating a signature and encoding the signature, all encoding is done using the base64url algorithm.

## Conclusion

JWTs are used all over the internet to increase security of web applications in a easy way, if you know [Keycloak](https://www.keycloak.org/), they also use JWT in their authentication solutions, you can see there a very good implementation of a JWT with a lot of information but no sensitive information at all.

And in the end, that's how JWTs work and how they're built, if there is any doubt about anything, you can open an issue in the Github repo of the blog **[here](https://github.com/luk3skyw4lker/luk3skyw4lker-blog)**.