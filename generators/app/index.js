const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  initializing () {
    console.log('initializing')
    this.answers = {}
  }

  writing () {
    console.log('writing ...')
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.answers.name
      }
    )
  }

  prompting () {
    console.log('prompting ...')
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Dime el nombre de tu aplicación',
        default: this.appname
      }
    ]).then(answers => {
      this.answers = answers
    })
  }

  install () {
    this.yarnInstall(['webpack', 'babel-core', 'babel-loader', 'babel-preset-env'], { 'dev': true })
  }

  end () {
    console.log('Hasta la vista baby')
  }
}
