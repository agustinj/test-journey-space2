module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/step_definitions/**/*.ts'],
    paths: ['features/**/*.feature'],
    format: ['html:cucumber-report.html'],
  },
};