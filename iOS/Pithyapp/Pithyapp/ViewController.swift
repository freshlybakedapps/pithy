//
//  ViewController.swift
//  Pithyapp
//
//  Created by John Tubert on 4/6/15.
//  Copyright (c) 2015 John Tubert. All rights reserved.
//

import UIKit
import TwitterKit




class ViewController: UIViewController {
    
    @IBOutlet weak var loginbutton: UIButton?
    
    @IBAction func onLogin(sender: UIButton) {
        let digits = Digits.sharedInstance()
        
        digits.authenticateWithCompletion { (session, error) in
            // Inspect session/error objects
            // play with Digits session
            if (error == nil) {
                
                
                self.showAlert()

            }
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        //https://dev.twitter.com/twitter-kit/ios-reference/dgtsession
        //var instance = Digits.sharedInstance()
        //instance.logOut()
        
        
        
        if (Digits.sharedInstance().session() != nil){
            showAlert()
            
            
            Twitter.sharedInstance().APIClient.loadUserWithID("27076384") {
                (user, error) -> Void in
                println(error)
            }

        }else{
            self.loginbutton?.hidden = false
        }
    }
    
    func showAlert(){
        var instance = Digits.sharedInstance()
        let alert = UIAlertView()
        alert.title = "Session"
        alert.message = "Already logged in with #: \(instance.session().phoneNumber)"
        alert.addButtonWithTitle("Okay")
        alert.show()
        
        self.loginbutton?.hidden = true
        
        var session = instance.session()
        
        println(session.authToken)
        println(session.authTokenSecret)
        println(session.userID)
        println(session.phoneNumber)

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

