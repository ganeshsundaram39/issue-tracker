const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')

/* Models */
const IssueModel = mongoose.model('Issue')


// start user signup function

let createIssueFunction = (req, res) => {
  const createIssue = () => {
    return new Promise((resolve, reject) => {

      console.log(req.body)
      console.log(req.files)
        const url = req.protocol + "://" + req.get("host");
      let newIssue = new IssueModel({
        issueId: shortid.generate(),
        title: req.body.title,
        description: req.body.description,
        imagePaths: req.files && req.files.length ? req.files.map(f=>`${url}/images/${f.filename}`).join(','):'',
      });
      newIssue.save((err, newIssue) => {
        if (err) {
          console.log(err)
          logger.error(err.message, 'issueController: createIssue', 10)
          let apiResponse = response.generate(true, 'Failed to create new Issue', 500, null)
          reject(apiResponse)
        } else {
          let newIssueObj = newIssue.toObject();
          resolve(newIssueObj)
        }
      })

    })
  }


  createIssue()
    .then(result => {
      console.log({ result });
      let apiResponse = response.generate(false, "Issue created", 200, result);
      res.send(apiResponse);
  }).catch(err => {
    console.log({err});
    res.send(err);
  })

}// end user signup function






module.exports = {

  createIssueFunction: createIssueFunction,

}// end exports
