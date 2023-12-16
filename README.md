
# El7a2ni
pic here

## Project description
#### Title
El7a2ni



#### Course
Advanced Computer Lab (CSEN 704/ DMET 706), Winter 2023

#### Theme 
Our project "EL7A2NI" is a comprehensive virtual clinic solution designed to revolutionize the healthcare experience for clinics, doctors, pharmacists, and patients. Our project is driven by the theme of creating a complete virtual clinic, seamlessly integrated with a pharmacy, to optimize and automate interactions within the medical ecosystem.

#### Objectives
* Gain an understanding of how to effectively utilize the Agile Methodology for project planning and software development

* Learn the process of following a given set of System Requirements to develop a software.

* Learn to research and master the use of the MERN Stack.

* Learn how to work together as a team on GitHub.

#### Overview
Our project was developed using the Agile Methodology, which involves breaking the project into shorter time periods called "Sprints." Each Sprint has a specific set of goals, and at the end of each Sprint, a fully functional version of the project is delivered and evaluated based on the specified system requirements. This approach allows for a more flexible and responsive development process, as it allows for ongoing adjustments and improvements to be made based on feedback and changing needs.


## Motivation
The project is done as a group for a german university course (Advanced Computer lab) and This project is done as a simulation to real company working flow where all team members contribuite together for a final project. which motivated us to put our efforts on a project where we can learn new technologies along side with implementing them on a real application .We make an online courses website to encourage people to develop their skills and make this process easy by learning from home.

## Build Status
* The project currently under development and there are some styling problems to be fixed

* Unit tests to be added.

## Code Styles
The project is formatted using prettier also The project follows the [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern ,MVC is a software architectural pattern commonly used for developing user interfaces that divide the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user , So the Files in the backend was divided into the M (models) where the schema of the models exist which represent the core of the database , the C (controller) where the functions needed for the routes exists and the V (views) the view in MERN stack is represented by the react frontend server. Also the routes in our project was abstracted from the controller function as shown in [API References]()


## Tech/Framework used
* [React](https://react.dev/)
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Stripe](https://stripe.com/)
* [Git](https://git-scm.com/)
* [Postman](https://www.postman.com/)
* [VSCode](https://code.visualstudio.com/)
* [JWT](https://jwt.io/)




## Features

## Code Examples
``` javascript
exports.selectPatient = async (req, res) => {
  const patientId = req.query.id;
  console.log(patientId);
  try {
    const resultedPatient = await Patient.findById(patientId);
    res.status(200).send(resultedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

``` javascript
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescriptionId = req.query.prescriptionId;

    const prescription = await Prescription.findById(prescriptionId).populate('doctor');

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.status(200).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
```

``` javascript
function RemoveAdmin() {
  const [username, setUsername] = useState("");
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.delete(
      "http://localhost:8000/api/v1/admins/deleteAdmin/" + username
    );
    console.log(response);
    setRes(response);
  };

  return (
    <div>
      <h2>Remove Admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Remove Admin</button>
      </form>
      {res && <div>admin deleted</div>}
      <Link to="/admins/home">Home</Link>
    </div>
  );
}

export default RemoveAdmin;
```


## Installation 
* Clone the Project
 ```http
git clone https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic
```

*  Open two terminals: 
#### - Back-End Terminal
 ** To install packages (You need to change directory to backend first ```cd .\backend\``` )  

  ```http
   npm i
   ``` 

 ** To run the Back-End  
 ```http
 npm start
 ```

 #### - Front-End Terminal
 ** To install packages (You need to change directory to Front-end first ```cd .\frontend\``` )   
 ```http 
 npm i
 ```

 ** To run the Front-End  
 ```http
 npm run dev
 ```







## API References

####  Admin Router

```http
 /api/v1/admins
```

| Route | Type     | Request body/params                | Description 
| :-------- | :------- | :------------------------- | :------------|
| `/pendingdoctors` | `GET` |  | Get pending doctors.
| `/add` | `POST` |**Body:** { username: ```String``` , password: ```String``` } | Add a new admin.
| `/deleteAdmin` | `DELETE` | **Params:** { username: ```String``` } | Delete an admin.
| `/deleteDoctor` | `DELETE` | **Params:** { username: ```String``` } | Delete a doctor.
| `/deletePatient` | `DELETE` | **Params:** { username: ```String``` } | Delete a patient.
| `/updateadmin` | `PUT` | **Body:** { username: ```String``` , password: ```String```} | Update admin's username and password.
| `/approve` | `PUT` | **Body:** { username: ```String``` } | Approve doctor request.



####  Appointment Router

```http
 /api/v1/appointments
```

| Route | Type     | Request body/params/query                | Description 
| :-------- | :------- | :------------------------- | :------------|
| `/addAppointment` | `POST` | **Query:** {familyMember:```String``` , doctor:```String``` , date:```Date``` }  | Add a new appointment.
| `/filterAppointments` | `GET` |**Query:** { startDate:```Date```, endDate:```Date```, status:```String``` } | Filter appointments by start date, end date and status of appointment.
| `/filterPatients` | `GET` | **Query:** { doctorUsername:```String``` } | Filter patients based on upcoming appointments using doctor username.
| `/filterDoctors` | `GET` | **Query:** { date:```Date``` , speciality:```String``` } | Filter doctors using speciality and date of appointment.
| `/rescheduleAppointment` | `PUT` | **Query:** { appointmentId:```String``` , rescheduleDate:```Date``` } | Reschedule an appointment using its ID and its new date.
| `/cancelAppointment` | `PUT` | **Query:** { appointmentId:```String``` } | Cancel an appointment using its ID.


####  Auth Router

```http
 /api/v1/auth
```

| Route | Type     | Request body/params                | Description 
| :-------- | :------- | :------------------------- | :------------|
| `/login` | `POST` | **Body:**{ username:```String```, password:```String``` } | Login using ID and password.
| `/logout` | `GET` | | Logout from the account.
| `/getMe` | `GET` |  | Used for testing purposes.
| `/forgetPassword` | `POST` | **Body:** { user: ```String``` } | Helps on forgetting password by giving username.
| `/verifyOTP` | `POST` | **Params:**   {username: ```String```} , **Body:** {otp: ```String```} | Sends an otp to phone number provided.
| `/resetPassword` | `POST` | **Params:** {username: ```String``` } | Update password of account using its username.
| `/changePassword` | `POST` |  | Changes password of logged in account.



####  Doctor Router

```http
 /api/v1/doctors
```

| Route | Type     | Request body/params                | Description 
| :-------- | :------- | :------------------------- | :------------|
| `/register` | `POST` | **Body:** { username:```String```, name:```String```, Documents:```String```, email:```String```, password:```String```, dateOfBirth:```Date```, hourlyRate:```Number```, affiliation:```String```, educationalBackground:```String```, registrationStatus:```String```, speciality:```String```, registeredPatients: ```String```, availableSlots: ```Date[]```, wallet:```Number```, otp:```String```, followUpRequests: ```Object[]``` }  | Register as a doctor.
| `/updateDoctor` | `PUT` |**Body:** { username:```String``` , email:```String``` ,  hourlyRate:```Number``` ,  affiliation:```String``` } | Update doctor's information.
| `/viewPatients` | `GET` |  | View all registered patient for a doctor.
| `/searchPatientsByName` | `GET` | **Query:**  { name: ```String``` }  | Search for a patient by his/her name.
| `/selectPatient` | `GET` | **Query:** { patientId: ```String``` } | Select a patient using his/her ID.
| `/doctordetails` | `GET` | **Params:** { username: ```String``` } | View all doctor information using his username.
| `/viewAllDoctors` | `GET` |  | View all doctors in the the whole clinic.
| `/viewPatientInfo` | `GET` |**Query:** { id: ```String``` } | View patient's information using his/her ID.
| `/filterDoctors` | `GET` |**Query:** { name: ```String``` , speciality: ```String```, registrationStatus: ```String``` , date: ```Date``` } | Filter doctors using their name, speciality, registeration status and date of his appointment.
| `/addAvailableSlot` | `PUT` |**Query:** { slotDate: ```Date``` } | Add a new available slot using its date.
| `/viewDoctorAppointments` | `GET` | | View appoints of the logged in doctor.
| `/acceptContract` | `PUT` | **Body:** { username: ```String``` }| Find user by username and accept contract.
| `/scheduleFollowUp` | `PUT` | **Body:** { patientId: ```String```, dateTime: ```String``` }| Schedule a follow-up with a registered patient using his ID and the follow-up date.
| `/viewAvailableSlots` | `GET` | | View available slots for the logged in doctor.
| `/getPatientMedicalHistory` | `GET` | **Query:** { patientId: ```String``` } | View a regestered aptient medical history.
| `/addPrescription` | `POST` | **Body:** { patientId: ```String```, medicines: ```String[]```, notes: ```String```, filled: ```Boolean``` } | Add a new prescription.
| `/prescription` | `PUT` | **Body:** { medicines: ```String[]```, notes:```String```, filled:```Boolean``` } , **Params:** { prescriptionId: ```String``` }| Update a prescription's information.
| `/viewAllPrescriptions` | `GET` | | View all prescriptions of the logged in doctor.







## Testing 
The api reoutes were tested using postman , Postman is an application used for API testing. It is an HTTP client that tests HTTP requests, utilizing a graphical user interface, through which we obtain different types of responses that need to be subsequently validated. Postman offers many endpoint interaction methods. The following are some of the most used, including their functions:

* GET: Obtain information
* POST: Add information
* PUT: Replace information
* PATCH: Update certain information
* DELETE: Delete information

## How to Use

## How to Contribuite
Anyone who would like to contribute in the project please send me an E-mail on besho.osama404@gmail.com

## Credits 
* [React.js](https://www.udemy.com/course/the-ultimate-react-course)

* [Mongoose docs](https://mongoosejs.com/docs/)

* [Express docs](https://expressjs.com/en/4x/api.html)

* [NodeJs docs](https://nodejs.org/docs/latest/api/)

* [Restful](https://www.oreilly.com/library/view/restful-web-api/9781098106737/)

* [Clean code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)




## License
This project is licenced under [Apache Licence 2.0](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/commit/05e93d94060ea8f72b2e4f860d00d7e7e3bee13f)
