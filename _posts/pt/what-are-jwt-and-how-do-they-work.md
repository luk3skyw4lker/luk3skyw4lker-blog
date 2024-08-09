---
title: 'JWTs: o que são e como eles funcionam'
excerpt: 'JWTs, JSON Web Tokens ou Tokens, você os conhece por vaŕios nomes, mas nesse artigo nós vamos expor eles em detalhes e mostrar como eles funcionam e como é o código para gerá-los'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**JWTs**:%20o%20que%20são%20e%20como%20eles%20funcionam&images=https://cdn.worldvectorlogo.com/logos/jwt-3.svg'
date: '2024-08-05T18:35:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**JWTs**:%20o%20que%20são%20e%20como%20eles%20funcionam&images=https://cdn.worldvectorlogo.com/logos/jwt-3.svg'
---

## Definição

A definição curta de um JSON Web Token (ou **JWT**) é: um token stateless que armazena informações importantes para comunicação entre duas partes. De acordo com a [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519), a definição longa é: Um meio compacto e URL-safe de representar informações para serem transferidas entre duas partes. As informações em um JWT são codificadas como um objeto JSON que é usado como o payload de uma estrutura JSON Web Signature (JWS), fazendo com que as informações possam ser digitalmente assinadas e integralmente protegidas com um Message Authentication Code (MAC) e/ou encriptadas.

JWTs são amplamente usados em quase todo tipo de sistema de autenticação para transferir informações não-sensíveis de um usuário ou permissões dele. A estrutura de um JWT é a seguinte:

```
<cabeçalho>.<payload>.<assinatura>
```

Consiste de três partes que são igualmente codificadas usando o algoritmo base64url e separadas por um caracter de ponto (.) no final de cada parte. O JWT é codificado como base64url para facilitar a transferência do token entre as partes. Aqui nós vamos mergulhar mais profundamente em cada uma das seções mencionadas.

### Codificação

Vamos falar sobre a codificação primeiro, o algoritmo usado na codificação do JWT é chamado base64url e é baseado em um algoritmo chamado base64. O algoritmo base64 é uma forma de codificação byte para texto pra representar dados binários em formato de texto usando um conjunto de letras e números específicos. O conjunto padrão do algoritmo base64 é esse:

```
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
```

A codificação base64 funciona fazendo uma série de operações matemáticas em cada byte dos dados que você quer codificar para transformá-los num código ASCII que se encaixa nesse conjunto de letras e números especificado acima.

Existem algumas versões da codificação base64 e uma delas é o algoritmo base64url, essa versão muda o conjunto um pouco para fazer com que a informação codificada em base64 segura para ser transmitida em URLs por query params ou parâmetros de url. O conjunto que o base64url usa é o seguinte:

```
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_
```

A diferença é que os últimos dois caracteres no set padrão são `+/` mas na versão base64url são `-_` porque os caracteres de soma e barra não podem ser seguramente usados em uma URL, já que são caracteres reservados usados na URL, o sinal de soma é comumente usado no lugar do espaço em URLs e a barra é usada para separar os caminhos da URL, por isso, JWTs usam a versão base64url do algoritmo para fazer com que os tokens fossem URL-safe.

### Cabeçalho

O cabeçalho de um JWT é composto por chaves contendo algumas informações gerais sobre o token, como as chaves `typ` e `alg`. Vamos falar sobre essas chaves:

- `typ`: essa chave usualmente informa qual é o tipo de mídia do JWT. É normalmente ignorado por que o objeto já é definido por ser um JWT;
- `alg`: a chave que especifica qual foi o algoritmo usado para gerar a parte de assinatura do JWT, ex: `HS256`. `RS256` entre outros;
- `cty`: parâmetro content type, não é recomendado no caso de não uso de assinatura aninhada ou operações de encriptações, se forem usadas, o valor recommendado é "JWT", para indicar que um JWT aninhado está contido no JWT que tem a chave `cty` presente.

Essas são as chaves mais comuns e definidas na RFC que podem ser usadas num JWT, você pode definir chaves customizadas mas chaves customizadas são mais comumente encontradas na parte de payload do JWT, que é a seção que falaremos no próximo ponto.

### Payload

Aqui você pode definir virtualmente qualquer chave que deve ser transferida entre as partes que vocẽ está se comunicando com. A RFC dos JWT especifica algumas chaves recomendadas para serem adicionadas nessa seção, aqui estão elas:

- `iss`: chave issuer, geralmente identifica o emissor do JWT, pode conter uma string ou uma URI de acordo com a RFC. O processamento dessa chave é específico para cada aplicação;
- `sub`: chave subject, geralmente identifica o usuário a quem o JWT pertence, de acordo com a RFC, essa chave tem que ser localmente ou globalmente única. O processamento dessa chave é específico para cada aplicação;
- `aud`: chave audience, geralmente identifica a audiência que o token deve atender, na maioria dos casos o seu valor é um vetor de strings. O processamento dessa chave geralmente se dá por validar se o sujeito processando o JWT se identifica com algum dos valores dentro da chave de audiência, se ele não está, o JWT deve ser rejeitado;
- `exp`: chave expiration, seu valor é geralmente um timestamp unix indicando quando que o JWT terá expirado, um token sem essa chave é geralmente considerado um token não-expirante. O processamento dessa chave geralmente se dá pela validação se a data atual é uma data antes o tempo de expiração na chave, se ela não está, o JWT deve ser rejeitado;
- `nbf`: chave not before, geralmente é um timestamp unix indicando quando o JWT deve ser aceito, um token sem essa chave pode ser aceito a qualquer momento. O processamento dessa chave geralmente se dá por uma validação para checar se a data atual é uma data depois do tempo especificado na chave, se ela não está, o JWT deve ser rejeitado;
- `iat`: chave issued at, geralmente é um timestamp unix indicando quando o JWT foi emitido, usado pra determinar a idade do token;
- `jti`: chave de ID do JWT, oferece um identificador único para um dado JWT. Deve ser localmente ou globalmente único, se você usar múltiplos emissores, colisão entre emissores também deve ser considerada, o que significa que para emissores diferentes o ID não pode ser repetido.

Os valores para todas as chaves acima são case-sensitive como definido pela RFC. Você pode criar chaves baseado em suas preferências mas eles podem estar sujeitos à colisões com outras chaves públicas que podem ser encontradas na RFC na [Seção 4.1](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1) e [Seção 4.2](https://datatracker.ietf.org/doc/html/rfc7519#section-4.2).

### Assinatura

A assinatura de um JWT é construída usando um algoritmo para gerar uma HMAC (Hash-based Message Authentication Code). Teoricamente, uma HMAC pode ser gerada usando qualquer algoritmo gerador de hashes, mas alguns são usados mais frequentemente para JWTs, são:

- `HS224` - Um algoritmo de geração de HMAC baseado no algoritmo de hashing SHA224;
- `HS256` - Um algoritmo de geração de HMAC baseado no algoritmo de hashing SHA256;
- `HS512` - Um algoritmo de geração de HMAC baseado no algoritmo de hashing SHA512;
- `RS224` - Uma assinatura RSA baseada no algoritmo de geração de hash SHA224;
- `RS256` - Uma assinatura RSA baseada no algoritmo de geração de hash SHA256;
- `RS512` - Uma assinatura RSA baseada no algoritmo de geração de hash SHA512;

Os que usam HMAC são mais simples, é basicamente uma hash gerada com as informações codificadas dentro do token juntamente com uma chave secreta, e já que uma função de hash criptográfica é uma função de apenas um caminho, você pode checar seu JWT gerando uma hash com as mesmas informações e chave para garantir que o JWT foi gerado por sua aplicação e não foi modificado. Para mais detalhes em funções de hash criptográficas, veja o artigo nesse blog: **[Funções de Hash Criptográficas](/pt/posts/cryptographic-hash-functions)**.

Os que usam RSA são mais complicados já que RSA é um tipo de criptografia assimétrica, um assunto que nos daria conteúdo o suficiente para outro artigo completo. Criptografia RSA usa um par de chaves, então você precisa ter uma chave pública e uma chave privada, você assina o token com a chave privada e valida a assinatura com sua chave pública.

**Note**: NUNCA EXPONHA nenhuma das chaves que você usa para assinar um JWT, é uma informação extremamente sensível e caso alguma delas seja exposta, atacantes podem falsificar pra entrarem na sua aplicação. SEMPRE use uma chave forte que é difícil de advinhar, como uma string aleatória gerada por algum programa ou um par de chaves RSA. A assinatura é a única coisa que faz com que o JWT seja seguro para sua aplicação usar.

## Geração

Vamos supor que nós temos a seguinte informação para codificar dentro de um JWT:

Cabeçalho:
```json
{"alg": "HS256","typ": "JWT"}
```

Payload:
```json
{"sub":"@luk3skyw4lker","name": "Lucas","iat":1723033068}
```

Como o processo deveria acontecer para a codificação dessas informações e como elas seriam no final? A resposta se dá seguindo esses passos:

1. Definir qual algoritmo de assinatura você usará;
2. Codifique a versão do header convertida em string em uma string base64url;
3. Codifique a versão do payload convertida em string em uma string base64url;
4. Use o payload codificado, o header codificado e a chave para gerar uma HMAC para verificar o JWT de acordo com o algoritmo escolhido;
5. Codifique a assinatura usando o algoritmo base64url;
6. Construa o token com as partes separadas por um ponto final.

No final desses passos, com a informação oferecida acima, usando o algoritmo `HS256` e uma chave `secret`, você provavelmente chegaria nesse JWT:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjMwMzMwNjgsIm5hbWUiOiJMdWNhcyIsInN1YiI6IkBsdWszc2t5dzRsa2VyIn0.3bTdm8791QTFsD0goJAOmZeveNgS1ExSfK8W631C4DU
```

**NOTE:** A ordem de uma string faz diferença na codificação base64url, você pode ter um resultado diferente dependendo de qual seja a ordem que as informações do cabeçalho ou do payload estão organizadas, mas essencialmente, você teria esse JWT ou um similar usando a informação oferecida aqui.

Já que o JWT é codificado usando apenas o base64url, qualquer pessoa pode decodificar o seu token e ver as informações dentro dele, então **NUNCA** coloque nenhuma informação sensível do usuário dentro do JWT. A única coisa fazendo com que o JWT seja seguro é a assinatura se sua chave não foi exposta, se foi, por favor mude sua chave completamente, isso automaticamente invalida todos os JWTs antigos que sua aplicação gerou.

Abaixo está um exemplo de código usando a biblioteca **[go-jwt](https://github.com/luk3skyw4lker/go-jwt)** e o algoritmo `HS256` para o método de assinatura:

```go
import (
  "crypto"
  "log"

  "github.com/luk3skyw4lker/go-jwt/signing/hmac"
  "github.com/luk3skyw4lker/go-jwt/utils"
  "github.com/luk3skyw4lker/go-jwt/jwt"
)

// shouldPad controla se a string base64 vai ser preenchida com '='
// de acordo com a spec do JWT, o preenchimento não é recomendado
// o valor padrão dessa variável também é falso internamente.
var shouldPad = false

func main() {
  // É recomendado que chaves sensíveis sejam guardadas em variáveis
  // de ambiente, o nome da chave na variável é da sua escolha.
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

Esse código gera e verifica o JWT ao mesmo tempo, então a saída da verificação sempre será verdadeiro porque o token é gerado e verificado instantaneamente. O código interno da biblioteca pode ser encontrado no [repositório do Github](https://github.com/luk3skyw4lker/go-jwt) mas o código básico para gerar o JWT se parece com isso:

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

Esse código implementa os passos especificados anteriormente codificando o cabeçalho, codificando o payload e gerando e codificando uma assinatura, toda a codificação é feita usando o algoritmo base64url.

## Conclusão

JWTs são usados por toda a internet para incrementar a segurança de aplicações web de uma forma fácil, se você conhece a solução [Keycloak](https://www.keycloak.org/), eles também usam JWTs nas suas soluções de autenticação, você pode checar uma implementação muito boa de um JWT com bastante informação mas nenhuma informação sensível.

E n final, é assim que os JWTs funcionam e como eles são construídos, se você tem alguma dúvida sobre qualquer coisa, você pode abrir uma issue no repositório do GitHub do blog **[aqui](https://github.com/luk3skyw4lker/luk3skyw4lker-blog)**.