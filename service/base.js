'use strict';

module.exports = class BaseService {
  constructor (Model) {
    this.Model = Model;
  }

  newAndSave (docs) {
    if (!Array.isArray(docs)) {
      docs = [docs];
    }
    return this.Model.insertMany(docs);
  }

  paginate (query, options = {}) {
    return this.Model.paginate(query, options);
  }

  getById (id) {
    return this.Model.findById(id);
  }

  find (query = {}, options = {}) {
    return this.Model.find(query, null, options);
  }

  findOne (query = {}, options = {}) {
    return this.Model.findOne(query, null, options);
  }

  updateById (id, doc, options = {}) {
    return this.Model.findByIdAndUpdate(id, doc, {
      new: true,
      ...options
    });
  }

  updateOne (query = {}, doc = {}, options = {}) {
    return this.Model.findOneAndUpdate(query, doc, {
      new: true,
      ...options
    });
  }

  updateMany (query = {}, doc = {}, options = {}) {
    return this.Model.update(query, doc, {
      multi: true,
      ...options
    });
  }

  del (query = {}) {
    return this.Model.remove(query);
  }

  delById (id = '') {
    return this.del({ _id: id });
  }

  delByIds (ids = []) {
    return this.del({
      _id: {
        $in: ids
      }
    });
  }

  aggregate (options = {}) {
    return this.Model.aggregate(options);
  }

  count (query = {}) {
    return this.Model.count(query);
  }
};