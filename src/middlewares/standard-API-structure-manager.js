
var qs = require('qs')
const func = require('../constants/url-constants')

const standardStructureStringToJson = function standardStructureStringToJson (queryString) {
  return qs.parse(queryString)
}
const standardStructureJsonToString = function standardStructureJsonToString (standardJson) {
  return qs.stringify(standardJson)
}
const getStandardAPIStructureJson = function getStandardAPIStructureJson (request, depth) {
  let requestPath = request.route.path
  let queryStringJson = {}
  let queryString = qs.stringify(request.query)
  if (depth !== undefined) {
    queryString = qs.stringify(request.query)
    queryStringJson = qs.parse(queryString, depth)
  } else {
    queryStringJson = this.standardStructureStringToJson(queryString)
  }
  queryStringJson[func.urlCons.PARAM_REQUEST_PATH] = requestPath
  return queryStringJson
}
/**
 * [getPaginationJson description]
 * @param  {[type]} offset [description]
 * @param  {[type]} limit  [description]
 * @return {[type]}        [description]
 */

/* var pagination = {
*  'limit':'5',
*  'offset':'1'
* }
**/

const getPaginationJson = function getPaginationJson (offset, limit) {
  let pagination = {}
  pagination[func.urlCons.PARAM_OFFSET] = offset
  pagination[func.urlCons.PARAM_LIMIT] = limit
  return pagination
}
const getFilterQueryJson = function getFilterQueryJson (field, op, value) {
  let query = {}
  let opValueJson = {}
  opValueJson[op] = value
  query[field] = opValueJson
  return query
}
const getFilterJsonForContainsOp = function getFilterJsonForContainsOp (array, op, values) {
  let query = {}
  query[func.urlCons.PARAM_ARRAY] = array
  query[func.urlCons.PARAM_CONTAINS] = op
  query[func.urlCons.PARAM_VALUES] = values
  return query
}
const getFilterJsonForElemMatchOp = function getFilterJsonForElemMatchOp (array, queryJson) {
  // func.printLog(func.logCons.LOG_LEVEL_DEBUG, 'getFilterJsonForElemMatchOp()', func.logCons.LOG_ENTER)
  let query = {}
  query[func.urlCons.PARAM_ARRAY] = array
  query[func.urlCons.PARAM_ELEM_MATCH] = queryJson
  // func.printLog(func.logCons.LOG_LEVEL_DEBUG, 'getFilterJsonForElemMatchOp()', func.logCons.LOG_EXIT)
  return query
}
const getArrayOpFilterJson = function getArrayOpFilterJson (op, queryJsonArray) {
  // func.printLog(func.logCons.LOG_LEVEL_DEBUG, 'getFilterQueryJson()', func.logCons.LOG_ENTER)
  let arrayOpQueryJson = {}
  arrayOpQueryJson[op] = queryJsonArray
  // func.printLog(func.logCons.LOG_LEVEL_DEBUG, 'getFilterQueryJson()', func.logCons.LOG_EXIT)
  return arrayOpQueryJson
}
const getProjectionJson = function getProjectionJson (fields) {
  return fields.toString()
}
const getSortJson = function getSortJson (field, sortType) {
  // func.printLog(func.logCons.LOG_LEVEL_DEBUG, 'getSortJson()', func.logCons.LOG_ENTER)
  let sortJson = {}
  sortJson[field] = sortType
  // func.printLog(func.logCons.LOG_LEVEL_DEBUG, 'getSortJson()', func.logCons.LOG_EXIT)
  return sortJson
}
const getStandardStructureForDBOp = function getStandardStructureForDBOp (requestRoutePath, pagination, filter, projection, sort) {
  let standardApiStructure = {}
  if (pagination) {
    standardApiStructure = pagination
  }
  if (filter) {
    standardApiStructure[func.urlCons.PARAM_FILTER] = filter
  }
  if (projection) {
    standardApiStructure[func.urlCons.PARAM_FIELDS] = projection
  }
  if (sort) {
    standardApiStructure[func.urlCons.PARAM_SORT] = sort
  }
  if (requestRoutePath) {
    standardApiStructure[func.urlCons.PARAM_REQUEST_PATH] = requestRoutePath
  }
  return standardApiStructure
}

module.exports = {
  getStandardStructureForDBOp,
  getSortJson,
  getProjectionJson,
  getArrayOpFilterJson,
  getFilterJsonForElemMatchOp,
  getFilterJsonForContainsOp,
  getFilterQueryJson,
  getPaginationJson,
  getStandardAPIStructureJson,
  standardStructureJsonToString,
  standardStructureStringToJson
}
