class BaseResource {
  constructor(
    insertRepository,
    updateRepository,
    findRepository,
    searchRepository,
    deleteRepository
  ) {
    this.insertRepository = insertRepository;
    this.updateRepository = updateRepository;
    this.findRepository = findRepository;
    this.searchRepository = searchRepository;
    this.deleteRepository = deleteRepository;
  }

  async save(entity, pool) {
    return await this.insertRepository.save(entity, pool);
  }
  async saveAll(pool, entity, sequence = false, pk = false) {
    return await this.insertRepository.saveAll(pool, entity, sequence, pk);
  }
  async update(entity, where, pool) {
    return await this.updateRepository.update(entity, where, pool);
  }
  async find(entity, pool) {
    return await this.findRepository.find(entity, pool, false);
  }
  async findFirst(entity, pool) {
    return await this.findRepository.findFirst(entity, pool);
  }
  async getSequence(sequenceName, pool) {
    return await this.findRepository.getSequence(sequenceName, pool);
  }
  async delete(entity, pool) {
    return await this.deleteRepository.delete(entity, pool);
  }
  async truncate(pool) {
    return await this.deleteRepository.truncate(pool);
  }
}

module.exports = BaseResource;
