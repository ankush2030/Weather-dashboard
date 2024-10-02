import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor() { }

  citiesArray: string[] = [
    // Haryana
    "Gurgaon", "Faridabad", "Panipat", "Karnal", "Rohtak", "Hisar", "Ambala", "Sonipat", "Yamunanagar",
    "Panchkula", "Kaithal", "Kurukshetra", "Jind", "Bhiwani", "Sirsa", "Bahadurgarh", "Rewari", "Palwal",
    "Hansi", "Mahendragarh", "Fatehabad", "Narwana", "Tosham",

    // Maharashtra
    "Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati",
    "Nanded", "Latur", "Jalgaon", "Akola", "Ahmednagar", "Chandrapur", "Dhule", "Sangli", "Malegaon",
    "Bhiwandi", "Parbhani", "Beed", "Gondia", "Wardha", "Jalna", "Satara",

    // Uttar Pradesh
    "Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Aligarh",
    "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Rampur",
    "Shahjahanpur", "Mathura", "Budaun", "Pilibhit", "Etawah", "Ayodhya", "Ballia",

    // Gujarat
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar",
    "Anand", "Navsari", "Morbi", "Nadiad", "Surendranagar", "Mehsana", "Bharuch", "Palanpur", "Bhuj",
    "Porbandar", "Veraval", "Vapi", "Godhra", "Valsad", "Botad",

    // Rajasthan
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bhilwara", "Sikar",
    "Bharatpur", "Pali", "Chittorgarh", "Tonk", "Beawar", "Sawai Madhopur", "Barmer", "Jaisalmer",
    "Bundi", "Dholpur", "Jhunjhunu", "Sri Ganganagar",

    // Karnataka
    "Bengaluru", "Mysuru", "Hubli", "Mangalore", "Belgaum", "Davangere", "Ballari", "Gulbarga",
    "Shimoga", "Tumkur", "Raichur", "Bidar", "Hospet", "Bijapur", "Udupi", "Chikkamagaluru",
    "Mandya", "Bagalkot", "Chitradurga", "Hassan",

    // Tamil Nadu
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode", "Vellore", "Tirunelveli",
    "Tiruppur", "Thoothukudi", "Nagercoil", "Dindigul", "Kanchipuram", "Thanjavur", "Hosur",
    "Kumbakonam", "Sivakasi", "Karur", "Pudukkottai", "Nagapattinam",

    // West Bengal
    "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Kharagpur", "Bally",
    "Raiganj", "Haldia", "Krishnanagar", "Medinipur", "Jalpaiguri", "Alipurduar", "Barasat",
    "Malda", "Berhampore", "Balurghat", "Bankura",

    // Andhra Pradesh
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry",
    "Kakinada", "Anantapur", "Kadapa", "Vizianagaram", "Ongole", "Eluru", "Chittoor", "Machilipatnam",

    // Telangana
    "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar",
    "Nalgonda", "Suryapet", "Miryalaguda", "Adilabad", "Mancherial", "Siddipet",

    // Punjab
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Batala",
    "Pathankot", "Moga", "Abohar", "Malerkotla", "Barnala", "Khanna", "Firozpur", "Zirakpur",

    // Kerala
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur", "Alappuzha", "Kollam",
    "Palakkad", "Kottayam", "Malappuram", "Pathanamthitta", "Idukki",

    // Bihar
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Bihar Sharif", "Purnia",
    "Begusarai", "Katihar", "Saharsa", "Hajipur", "Arrah", "Sasaram", "Samastipur",
    "Dehri", "Bettiah",

    // Assam
    "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tinsukia", "Nagaon", "Tezpur", "Bongaigaon",
    "Dhubri", "Diphu", "Goalpara", "Sibsagar",

    // Odisha
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Balasore", "Puri",
    "Baripada", "Bhadrak", "Jharsuguda", "Jeypore", "Phulbani", "Paralakhemundi",

    // Madhya Pradesh
    "Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Ratlam", "Sagar", "Dewas",
    "Satna", "Rewa", "Katni", "Chhindwara", "Morena", "Singrauli", "Khandwa",

    // Himachal Pradesh
    "Shimla", "Solan", "Mandi", "Dharamshala", "Baddi", "Nahan", "Kullu",
    "Chamba", "Una", "Palampur", "Hamirpur", "Bilaspur",

    // Jammu and Kashmir
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Udhampur",
    "Sopore", "Rajouri", "Poonch", "Pulwama", "Handwara", "Kupwara",

    // Arunachal Pradesh
    "Itanagar", "Tawang", "Pasighat", "Ziro", "Bomdila", "Tezu",

    // Chhattisgarh
    "Raipur", "Bhilai", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Ambikapur",

    // Goa
    "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",

    // Jharkhand
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh",

    // Mizoram
    "Aizawl", "Lunglei", "Saiha", "Serchhip", "Kolasib", "Champhai", "Mamit",

    // Nagaland
    "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Mon", "Zunheboto",

    // Sikkim
    "Gangtok", "Namchi", "Geyzing", "Mangan",

    // Tripura
    "Agartala", "Kailashahar", "Dharmanagar", "Ambassa",

    // Uttarakhand
    "Dehradun", "Haridwar", "Rishikesh", "Nainital", "Haldwani", "Rudrapur", "Pithoragarh", "Kashipur",

    // Union Territories
    // Andaman and Nicobar Islands
    "Port Blair", "Diglipur", "Car Nicobar", "Rangat",

    // Chandigarh
    "Chandigarh",

    // Dadra and Nagar Haveli and Daman and Diu
    "Daman", "Diu", "Silvassa",

    // Lakshadweep
    "Kavaratti", "Minicoy", "Agatti",

    // Delhi
    "New Delhi", "Delhi", "Dwarka", "Saket", "Rohini",

    // Puducherry
    "Puducherry", "Karaikal", "Yanam", "Mahe",

    // Ladakh
    "Leh", "Kargil"
  ]

  getCitiesList() {
    return this.citiesArray;
  }

}
