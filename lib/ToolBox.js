"use strict";

var DrawingError = require('./DrawingError');

var ToolBox = function () {
  var toolbox = this;

  toolbox.tools = {
    P: require('./Point'),
    L: require('./Line'),
    R: require('./Rectangle'),
    O: require('./Circle'),
    B: require('./Bucket')
  };

  toolbox.createTool = function (identifier, args) {
    if (typeof toolbox.tools[identifier] === 'undefined') {
      throw new DrawingError('I don\'t know about that drawing tool');
    }

    return new toolbox.tools[identifier](args);
  }
};

module.exports = ToolBox;
