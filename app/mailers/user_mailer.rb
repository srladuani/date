class UserMailer < ActionMailer::Base
  default from: "no-reply@areyoutaken.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #
  
  def registration_confirmation(user)
    @user = user
    mail(:to => user.email, :subject => "Welcome to AreYouTaken — the Dating Site That Goes Offline‏")
  end
  
  def password_reset(user)
    @user = user
    mail :to => user.email, :subject => "Reset Your Password For AreYouTaken"
  end
  
  def subscriber(user)
    @user = user
    mail(:to => user.email, :subject => "Your Subscription Information For AreYouTaken")
  end
end