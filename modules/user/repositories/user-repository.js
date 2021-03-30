const bcrypt = require('bcryptjs');
const base = require('../../../bin/base/repository-base');

class userRepository {
	constructor() {
		this._base = new base('tb_User');
	}

	async authenticate(email, password) {
		const users = await this._base.get({ email });
		if (!users || !users[0]) {
			return null;
		}
		if (await bcrypt.compareSync(password, users[0].password)) {
			return users[0];
		}
		return null;
	}

	emailExists(email) {
		return this._base.get({ email });
	}

	async create(data) {
		const { password, email, name } = data;
		const id = await this._base.getSequence('id_seq_user');
		return this._base.create({ password, email, name, id });
	}

	async update(entity, where) {
		const updated = await this._base.update(entity, where);
		if (!updated) {
			return null;
		}
		return this._base.get(where);
	}

	delete(id) {
		return this._base.delete(id);
	}
}

module.exports = userRepository;
