<?php
	class conection {
		public $host = "localhost";
		public $db = "rcpomo_events";
		public $login = "root";
		public $password = "";

		public function displayHost() {
			echo $this->host;
		}

		public function displayDataBase() {
			echo $this->db;
		}

		public function displayLogin() {
			echo $this->login;
		}

		public function displayPass() {
			echo $this->password;
		}
	};
?>


