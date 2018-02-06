const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  initializing () {
    console.log('initializing')
    this.answers = {}
  }

  writing () {
    console.log('writing ...')
    this._writeTemplate(
      {
        templatePath: 'package.json',
        destinationPath: 'package.json',
        data: this.answers
      }
    )
  }

  _writeTemplate (config) {
    this.fs.copyTpl(
        this.templatePath(config.templatePath),
        this.destinationPath(config.destinationPath),
        config.data
      )
  }

  prompting () {
    console.log('prompting ...')
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Dime el nombre de tu aplicación react',
        default: this.appname
      }
    ]).then(answers => {
      this.answers = answers
    })
  }

  install () {
    this.yarnInstall(['react', 'react-dom'])
    this.yarnInstall(['webpack', 'babel-core', 'babel-loader', 'babel-preset-env'], { 'dev': true })
  }

  end () {
    console.log('Hasta la vista baby')
  }
}
