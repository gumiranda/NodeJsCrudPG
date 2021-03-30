const bcrypt = require('bcryptjs');
const base = require('../../../bin/base/repository-base');

class userRepository {
	constructor() {
		this._base = new base('User');
		this._projection = 'nome email payDay type cpf phone';
	}

	async authenticate(email, senha) {
		const user = await this._base.getByAny({ email });
		if (await bcrypt.compareSync(senha, user.senha)) {
			return user;
		}
		return null;
	}

	EmailExists(email) {
		return this._base.getByAny({ email });
	}

	async create(data) {
		const id = await this._base.getSequence('api.id_user');
		return this._base.create({ ...data, id });
	}

	async update(entity, where) {
		return this._base.update(entity, where);
	}

	getAll() {
		return this._base.getAll();
	}

	delete(id) {
		return this._base.delete(id);
	}
}

module.exports = userRepository;
