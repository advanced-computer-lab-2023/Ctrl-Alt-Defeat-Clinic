
# El7a2ny
![1111211](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/assets/102230910/7b7927ee-4d83-4e08-a6c2-38d86a4fed1a)

## Table of Contents
* [Project description](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/blob/main/README.md#project-description)
* [Motivation]()
* [Build Status]()
* [Code Styles]()
* [Tech/Framework used]()
* [Features]()
* [Screenshots]()
* [Code Examples]()
* [Installation]()
* [API References]()
* [Testing]()
* [How to Use]()
* [How to Contribuite]()
* [Credits]()
* [License]()


## Project description

#### Title
El7a2ny

#### Course
Advanced Computer Lab (CSEN 704/ DMET 706), Winter 2023

#### Theme 
Our project "EL7A2NY" is a comprehensive virtual clinic solution designed to revolutionize the healthcare experience for clinics, doctors, pharmacists, and patients. Our project is driven by the theme of creating a complete virtual clinic, seamlessly integrated with a pharmacy, to optimize and automate interactions within the medical ecosystem.

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
#### Our Website User Types:  
 Admin-Doctor-Patient-Guest   
 ####  **Admin's Features**  
 <details><summary>As an Admin you can :</summary><br>      
   
 - add another adminstrator with a set username and password
 - remove a doctor/patient / Admin from the system
 - view all of the information uploaded by a doctor to apply to join the platform
 - accept or reject the request of a doctor to join the platform  
 - add/update/delete health packages with different price ranges depending on the services included in each package ( silver, gold, platinum).
 - accept a request for the registration of a doctor

   </details>
   
  ####  **Doctor Features**    
  
  <details><summary>As a Doctor you can :</summary><br>
    
- edit/ update my email, hourly rate or affiliation (hospital)
- view and accept the employment contract
- add my available time slots for appointments
- view information and health records of patient registered with me
- view a list of all my patients
- search for a patient by name
- filter patients based on upcoming appointments
- select a patient from the list of patients
- reschedule an appointment for a patient
- schedule a follow-up for a patient
 - add/delete medicine to/from the prescription from the pharmacy platform
 - add/update dosage for each medicine added to the prescription
 - add new health records for a patient
 - add a patient's prescription
 - update a patient's prescription before it is submitted to the pharmacy
 - accept or revoke a follow-up session request from a patient
</details>

####  **Patient Features** 
<details><summary>As a Patient you can :</summary><br>   
  
   - upload/remove documents (PDF,JPEG,JPG,PNG) for my medical history
   - add family members using name, National ID, age, gender and relation to the patient 
   - link another patient's account as a family member using email or phone number stating relation to the patient
   - choose to pay for my appointment using my wallet or credit card
   - enter credit card details and pay for an appointment using Stripe
   - view registered family members
   - view health package options and details
   - subscribe to a health package for myself and my family members (if any)
   - choose to pay for the chosen health package using wallet or credit card 
   - view subscribed health package  for myself and my family members (if any)
   - View the status of my health care package subscription (subscribed with renewal date/ unsubscribed/ cancelled with end date)  for myself and my family members (if any)
   - cancel a subscription of a health package  for myself and my family members (if any)
   - View a list of all doctors along with their specialty, and session price (based on subscribed health package if any)
   - Search for a doctor by name and/or specialty 
   - filter  a doctor by specialty and/or availability on a certain date and at a specific time
   - select a doctor from the search/filter results 
   - view all details of selected doctors including specialty, affiliation (hospital), educational background 
   - view all available appointments of a selected doctor
   - select an appointment date and time for myself or for a family member
   - reschedule an appointment for myself or for a family member
   - view a list of all my prescriptions
   - filter prescriptions based on date or doctor or filled or unfilled
   - select a prescription from my list of prescriptions
   - view the details of my selected prescription
   - choose to pay directly for the prescription items wallet or credit card
   - request a follow-up to a previous appointment for myself or a family member
   - receive a refund in my wallet when a doctor cancels an appointment
</details>
    
 ####  **Doctor & Patient Features**      
 
 <details><summary>As a Doctor or Patient you can :</summary><br>
   
  - View uploaded health records 
  - filter appointments by date/status
  - View all new and old prescriptions and their statuses (filled/ not filled)
  - receive a notification of my appointment on the system and by mail 
  - View a list of all my upcoming / past appointments
  - filter appointments by date or status (upcoming, completed, cancelled, rescheduled)
  - cancel an appointment for myself or for a family member
  - receive a notification that my appointment is cancelled or rescheduled on the system and by mail 
  - download selected prescription (PDF) 
  - start/end a video call with the doctor/ patient
  - View the amount in my wallet
  - chat with a doctor/patient
</details>

   ####  **Guest Features**      
   
  <details><summary>As a Guest you can :</summary><br>
    
  - register as a patient using username, name, email, password, date of birth, gender, mobile number, emergency contact ( full name, mobile number)
  - submit a request to register as a doctor using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background
  - upload and submit required documents upon registration a doctor such as ID, Medical licenses, and medical degree
</details>

####  **Registered  Features**      
  <details><summary>As a Registered User you can :</summary><br>
  - login with username and password
  - Logout
  - change password
  - reset a forgotten password through OTP sent to email

  </details>


## Screenshots
**Home page**
![sc1](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/assets/126988144/4db24ae5-1290-4e66-b569-a84d978f7d7e)

**Doctor registeration page**
![sc7](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/assets/126988144/ab169dbb-5b05-42c8-9c13-e4d6b3c787e9)

**Patient registeration page**
![sc2](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/assets/126988144/819e9958-9be0-4ea5-b3ec-7b68954c54d1)

**Sign in page**
![sc5](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/assets/126988144/9b556b7c-0c2c-442f-b01a-cc8e4607957c)

**Viewing health pacjages**
![sc1](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/assets/126988144/65c184f8-b543-4035-9119-0bfeb65a4232)

**Viewing doctor information**
![sc3](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/assets/126988144/9bd869d5-9ef6-4177-9ca6-b28af9a950e3)


## Code Examples

* Selects a patients by his ID.
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

* Gets a prescription by its ID.
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
* Deletes an admin from the database. 
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

#### - Admin Router

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



#### - Appointment Router

```http
 /api/v1/appointments
```

| Route | Type     | Request body/params/query                | Description 
| :-------- | :------- | :------------------------- | :------------|
| `/addAppointment` | `POST` | **Query:** {familyMember:```Object``` , doctor:```String``` , date:```Date``` }  | Add a new appointment.
| `/filterAppointments` | `GET` |**Query:** { startDate:```Date```, endDate:```Date```, status:```String``` } | Filter appointments by start date, end date and status of appointment.
| `/filterPatients` | `GET` | **Query:** { doctorUsername:```String``` } | Filter patients based on upcoming appointments using doctor username.
| `/filterDoctors` | `GET` | **Query:** { date:```Date``` , speciality:```String``` } | Filter doctors using speciality and date of appointment.
| `/rescheduleAppointment` | `PUT` | **Query:** { appointmentId:```String``` , rescheduleDate:```Date``` } | Reschedule an appointment using its ID and its new date.
| `/cancelAppointment` | `PUT` | **Query:** { appointmentId:```String``` } | Cancel an appointment using its ID.


#### - Auth Router

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



#### - Doctor Router

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



#### - Package Router

```http
 /api/v1/packages
```

| Route | Type     | Request body/params                | Description 
| :-------- | :------- | :------------------------- | :------------|
| `/getPackages` | `GET` |    | View all packages exist.
| `/addPackage` | `POST` |**Body:** { name: ```String``` , price: ```String``` , discounts: ```Number[]``` } | Create a new package.
| `/updatePackage` | `PUT` | **Params:** { name: ```String``` } , **Body:** { name: ```String``` , price: ```String``` , discounts: ```Number[]``` }  | Update information of an existing package using its name.
| `/deletePackage` | `DELETE` | **Params:** { name: ```String``` } | Delete a package using its name.



#### - Patient Router

```http
 /api/v1/patients
```

| Route | Type     | Request body/params                | Description 
| :-------- | :------- | :------------------------- | :------------|
| `/register` | `POST` | **Body:** { username: ```String``` , name: ```String``` , email: ```String```, password: ```String```, dateOfBirth: ```Date```, nationalId: ```Number```, gender: ```String```, mobileNumber: ```String```, emergencyContact:{ fullname:```String```, mobileNumber:```String```} , healthPackage: ```Object```, healthPackageStatus: ```String```, healthPackageRenewalDate: ```Date```, healthPackageEndDate: ```Date```, familyMembers: ```Object[]```, medicalHistory: ```String[]```, wallet: ```String``` , otp: ```String```   }   | Register as a patient.
| `/UploadMedicalDocuments` | `POST` |**File** {  } | Upload medical documents for patient.
| `/getAllPrescriptionsForPatient` | `GET` | **Query:** { username: ```String``` }  | View all prescriptions of logged in patient.
| `/getPrescriptionById` | `GET` | **Query:** { prescriptionId: ```String``` } | View a prescription of patient by its ID.
| `/filterPrescriptions` | `GET` | **Query:** { date: ```Date```, doctorUsername: ```String```, filled; ```Boolean```, patientUsername:```String``` } | Filter prescriptions by their date, doctor username, filled and patient username. 
| `/viewDoctors` | `GET` | **Params:** { username: ```String``` } | View all doctors for the logged in patient.
| `/searchForDoctors` | `GET` | **Query:** { name: ```String```, speciality:```String``` } | Search for a doctor that the patient is registered with by his name and speciality.
| `/uploadFile` | `POST` | **Query:** { name: ```String```, speciality:```String``` } | Search for a doctor that the patient is registered with by his name and speciality.
| `/deleteMedicalHistory` | `DELETE` | **Query:** { filepath: ```String``` } | Delete a medical history of the patient.
| `/getAllMedicalHistory` | `GET` |  | View all medical history of the patient.
| `/viewDoctorSlots` | `GET` | **Query:** { doctorUsername: ```String``` } | View available slots of a doctor.
| `/viewPatientAppointments` | `GET` |  | View the patient's appointments.
| `/addMember` | `POST` | **Query:** { name: ```String```, nationalId:```Number``` , age:```Number``` , gender:```String``` , healthPackage:```String``` , healthPackageStatus:```String``` , healthPackageRenewalDate:```Date```,  healthPackageEndDate:```Date``` , relationToPatient: ```String```  } | Add a new family member for the patient.
| `/linkMember` | `POST` | **Body:** { phoneNumber: ```Number```, email: ```String```, relationship:```String``` } | Link a new family member to the patient.
| `/viewFamilyMembers` | `GET` |  | View the patient's family members.
| `/subscribeToHealthPackage` | `POST` | **Body:** { healthPackageId: ```String``` } | Subscribe the patient to a health package.
| `/viewStatusOfHealthPackage` | `GET` |  | Get the status of health package for the patient, if it is subscribed or not or cancelled.
| `/createCheckoutSessionForHp` | `POST` | **Body:** { healthPackageId: ```String``` } | Create a checkout session.
| `/subscribeToHealthPackageByWallet` | `POST` | **Body:** { healthPackageId: ```String``` } | Subscribe to a health package using wallet.
| `/requestFollowUp` | `PUT` | **Query:** { familyMember: ```Object```, doctor: ```Object``` , date : ```Date``` } | Send a request to a specific doctor for a follow-up session. 
| `/getPrescriptionsForPatient` | `GET` | **Body:** { healthPackageId: ```String``` } | View all prescriptions for the patient.






## Testing 
The API routes were tested using Postman, Postman is an application used for API testing. It is an HTTP client that tests HTTP requests, utilizing a graphical user interface, through which we obtain different types of responses that need to be subsequently validated. Postman offers many endpoint interaction methods. The following are some of the most used, including their functions:

* GET: Obtain information
* POST: Add information
* PUT: Replace information
* PATCH: Update certain information
* DELETE: Delete information

#### Here are examples of the tests using **Postman** :
*  **View patients of a doctor**
pic 

*  **Get all packages**
pic

* **View all prescriptions of a doctor**
pic





## How to Use
You can use our website as one of four main users (Admin , Doctor or Patient), you can sign up for an account from the sign up page to the website as any of user types then you can login and change your password and use all of our features.

## How to Contribuite
Anyone who would like to contribute to the project please send me an E-mail on besho.osama404@gmail.com

## Credits 
* [React.js](https://www.udemy.com/course/the-ultimate-react-course)

* [Mongoose docs](https://mongoosejs.com/docs/)

* [Express docs](https://expressjs.com/en/4x/api.html)

* [NodeJs docs](https://nodejs.org/docs/latest/api/)

* [Restful](https://www.oreilly.com/library/view/restful-web-api/9781098106737/)

* [Clean code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)




## License
This project is licenced under [Apache Licence 2.0](https://github.com/advanced-computer-lab-2023/Ctrl-Alt-Defeat-Clinic/commit/05e93d94060ea8f72b2e4f860d00d7e7e3bee13f)
