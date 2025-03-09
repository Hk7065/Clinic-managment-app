<template>
  <div class="container">
    <header class="my-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Clinic Dashboard</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#overview">Overview</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#appointments">Appointments</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#patients">Patients</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#staff">Staff</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#reports">Reports</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                More
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <button @click="logout">Logout</button>
        </div>
      </nav>
    </header>
    <main>
      <section id="overview" class="mb-4">
        <h2>Overviews</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Total Appointments</h3>
                <p class="card-text">{{ totalAppointments }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Total Patients</h3>
                <p class="card-text">{{ totalPatients }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Total Staff</h3>
                <p class="card-text">{{ totalStaff }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="appointments" class="mb-4">
        <h2>Appointments</h2>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in appointments" :key="appointment.id">
                <td>{{ appointment.date }}</td>
                <td>{{ appointment.time }}</td>
                <td>{{ appointment.patient }}</td>
                <td>{{ appointment.doctor }}</td>
                <td>{{ appointment.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="patients" class="mb-4">
        <h2>Patients</h2>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Last Visit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in patients" :key="patient.id">
                <td>{{ patient.name }}</td>
                <td>{{ patient.age }}</td>
                <td>{{ patient.gender }}</td>
                <td>{{ patient.contact }}</td>
                <td>{{ patient.lastVisit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="staff" class="mb-4">
        <h2>Staff</h2>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Contact</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="staff in staffList" :key="staff.id">
                <td>{{ staff.name }}</td>
                <td>{{ staff.position }}</td>
                <td>{{ staff.contact }}</td>
                <td>{{ staff.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="reports" class="mb-4">
        <h2>Reports</h2>
        <div class="row">
          <div class="col-md-6">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Monthly Revenue</h3>
                <p class="card-text">{{ monthlyRevenue }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card text-center">
              <div class="card-body">
                <h3 class="card-title">Patient Growth</h3>
                <p class="card-text">{{ patientGrowth }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      totalAppointments: 0,
      totalPatients: 0,
      totalStaff: 0,
      appointments: [],
      patients: [],
      staffList: [],
      monthlyRevenue: 0,
      patientGrowth: 0,
    };
  },
  created() {
    this.fetchOverviewData();
    this.fetchAppointments();
    this.fetchPatients();
    this.fetchStaff();
    this.fetchReports();
  },
  methods: {
    async logout() {
      const router = useRouter(); // Ensure useRouter is used inside a function
      try {
        await signOut(auth);
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error.message);
      }
    },
    fetchOverviewData() {
      this.totalAppointments = 120;
      this.totalPatients = 300;
      this.totalStaff = 50;
    },
    fetchAppointments() {
      this.appointments = [
        { id: 1, date: '2025-03-01', time: '10:00 AM', patient: 'John Doe', doctor: 'Dr. Smith', status: 'Confirmed' },
        { id: 2, date: '2025-03-02', time: '11:00 AM', patient: 'Jane Doe', doctor: 'Dr. Johnson', status: 'Pending' },
      ];
    },
    fetchPatients() {
      this.patients = [
        { id: 1, name: 'John Doe', age: 30, gender: 'Male', contact: '123-456-7890', lastVisit: '2025-02-15' },
        { id: 2, name: 'Jane Doe', age: 25, gender: 'Female', contact: '098-765-4321', lastVisit: '2025-02-20' },
      ];
    },
    fetchStaff() {
      this.staffList = [
        { id: 1, name: 'Dr. Smith', position: 'Doctor', contact: '123-456-7890', email: 'smith@example.com' },
        { id: 2, name: 'Dr. Johnson', position: 'Doctor', contact: '098-765-4321', email: 'johnson@example.com' },
      ];
    },
    fetchReports() {
      this.monthlyRevenue = 50000;
      this.patientGrowth = '10%';
    },
  },
};
</script>


<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
}

.main-container {
    max-width: 1200px;
    margin: 0 auto;
}

header h1 {
    margin-bottom: 1rem;
}

.nav-link {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
}

main {
    margin: 2rem 0;
}

section {
    margin-bottom: 2rem;
}

.card {
    background-color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table-responsive {
    margin-bottom: 2rem;
}

.table th, .table td {
    text-align: left;
}

.table th {
    background-color: #f4f4f4;
}
#overview {
    margin-top: 20px;
    width: 100%;
    border-collapse: collapse;
    border-radius: 4px;
  }
 
</style>