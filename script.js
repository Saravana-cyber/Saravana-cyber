import java.util.*;

public class StudentAttendanceSystem {
    // Map to store students' information (Student ID as key and Student Name as value)
    private static Map<String, String> students = new HashMap<>();
    
    // Map to store attendance (Date as key and a Map of student ID and Attendance Status as value)
    private static Map<String, Map<String, String>> attendanceRecords = new HashMap<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Menu for interaction
        while (true) {
            System.out.println("\nStudent Attendance System");
            System.out.println("1. Add Student");
            System.out.println("2. Mark Attendance");
            System.out.println("3. View Attendance for a Student");
            System.out.println("4. View All Attendance on a Specific Date");
            System.out.println("5. Exit");
            System.out.print("Choose an option: ");

            String choice = scanner.nextLine();

            switch (choice) {
                case "1":
                    addStudent(scanner);
                    break;
                case "2":
                    markAttendance(scanner);
                    break;
                case "3":
                    viewStudentAttendance(scanner);
                    break;
                case "4":
                    viewAllAttendance(scanner);
                    break;
                case "5":
                    System.out.println("Exiting the system.");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    // Method to add students
    private static void addStudent(Scanner scanner) {
        System.out.print("Enter student ID: ");
        String studentId = scanner.nextLine();
        System.out.print("Enter student name: ");
        String studentName = scanner.nextLine();
        
        // Check if student already exists
        if (students.containsKey(studentId)) {
            System.out.println("Student already exists!");
        } else {
            students.put(studentId, studentName);
            System.out.println("Student " + studentName + " added successfully!");
        }
    }

    // Method to mark attendance
    private static void markAttendance(Scanner scanner) {
        System.out.print("Enter date (YYYY-MM-DD): ");
        String date = scanner.nextLine();

        // Get the student list
        System.out.print("Enter student ID: ");
        String studentId = scanner.nextLine();
        
        // Check if student exists
        if (!students.containsKey(studentId)) {
            System.out.println("Student with ID " + studentId + " does not exist.");
            return;
        }
        
        // Ask for attendance status
        System.out.print("Enter attendance status (Present/Absent): ");
        String status = scanner.nextLine();

        // Add attendance record
        attendanceRecords.putIfAbsent(date, new HashMap<>());
        attendanceRecords.get(date).put(studentId, status);
        System.out.println("Attendance for " + students.get(studentId) + " on " + date + " marked as " + status + ".");
    }

    // Method to view attendance for a specific student
    private static void viewStudentAttendance(Scanner scanner) {
        System.out.print("Enter student ID: ");
        String studentId = scanner.nextLine();

        // Check if student exists
        if (!students.containsKey(studentId)) {
            System.out.println("Student with ID " + studentId + " does not exist.");
            return;
        }

        // Display attendance records for the student
        System.out.println("Attendance report for " + students.get(studentId) + ":");
        boolean found = false;
        for (Map.Entry<String, Map<String, String>> entry : attendanceRecords.entrySet()) {
            if (entry.getValue().containsKey(studentId)) {
                System.out.println("Date: " + entry.getKey() + " | Status: " + entry.getValue().get(studentId));
                found = true;
            }
        }

        if (!found) {
            System.out.println("No attendance records found for " + students.get(studentId));
        }
    }

    // Method to view all attendance for a specific date
    private static void viewAllAttendance(Scanner scanner) {
        System.out.print("Enter date (YYYY-MM-DD): ");
        String date = scanner.nextLine();

        // Check if there is attendance for the given date
        if (!attendanceRecords.containsKey(date)) {
            System.out.println("No attendance records for the date " + date);
            return;
        }

        // Display attendance records for the given date
        System.out.println("Attendance for " + date + ":");
        Map<String, String> records = attendanceRecords.get(date);
        for (Map.Entry<String, String> record : records.entrySet()) {
            String studentId = record.getKey();
            String status = record.getValue();
            System.out.println("Student: " + students.get(studentId) + " | Status: " + status);
        }
    }
}
