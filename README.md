# NGX-EC2-DEPLOY

☁️🚀 Deploy your Nodejs app to Amazon EC2 directly from the Angular CLI 🚀☁️

## Quick Start

1. Install the latest version of Angular cli

```sh

 yarn global add @angular/cli

```

2. Create a new Angular project

```sh

ng new hello-world --defaults

cd hello-world

```

3. Add `ngx-ec2-deploy` to your project

```sh

 yarn add ngx-ec2-deploy

```

5. After these step your `angular.json` is update with a new builder:

```json
  "deploy": {
    "builder": "ngx-ec2-deploy:deploy",
    "options": {
      "production": {
        "host": "ec2-3-6-122-80.ap-south-1.compute.amazonaws.com",
        "username": "ec2-user",
        "remotePath": "scripts",
        "privateKey": "ssh/voopik-mumbai.pem",
        "postDeploy": "sudo pm2 restart all"
      }
    }
  }
```

6. Run `ng deploy` to deploy your application to Amazon EC2.

🚀**_Happy deploying!_** 🚀

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

The builder is located in the `builder` folder.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>

<tr>

<td  align="center"><a  href="https://techaks.github.io"><img  src="https://findakash.com/assets/img/mypic.jpg"  width="100px;"  alt=""/><br  /><sub><b>Akash Gupta</b></sub></a><br  /><a  href="https://github.com/techaks/ngx-ec2-deploy/commits?author=Akash"  title="Code">💻</a>  <a  href="#content-Akash"  title="Content">🖋</a>  <a  href="https://github.com/techaks/ngx-ec2-deploy/pulls"  title="Reviewed Pull Requests">👀</a></td>



</tr>

</table>

  

<!-- markdownlint-enable -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
