const mysql = require("./db.js");
const connection = mysql.connection;

// constructor
const user = function(user) {
  this.name = user.name;
  this.phone = user.phone;
  this.iqama = user.iqama;
};

user.create = (newuser, result) => {
  connection.query("INSERT INTO users SET ?", newuser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { uid: res.insertId, ...newuser });
    result(null, { uid: res.insertId, ...newuser });
  });
};

user.findById = (userId, result) => {
  connection.query(`SELECT * FROM users WHERE uid = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

user.getAll = result => {
  connection.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

user.updateById = (uid, user, result) => {
  connection.query(
    `UPDATE users SET phone = ?, name = ?, iqama = ? WHERE uid = ${uid}`,
    [user.phone, user.name, user.iqama],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { uid: uid, ...user });
      result(null, { uid: uid, ...user });
    }
  );
};

user.remove = (uid, result) => {
  connection.query("DELETE FROM users WHERE uid = ?", uid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", uid);
    result(null, res);
  });
};

user.removeAll = result => {
  connection.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = user;