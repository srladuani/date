module ApplicationHelper

  def flash_messages
    return nil if flash.empty?
    flash_messages = ''
    flash.each { |key, msg| flash_messages += content_tag(:div, msg) }
    content_tag(:div, flash_messages.html_safe, :class => 'notices')
  end

  def extract_date(timestamp)
  	timestamp.strftime("%B %d, %Y")
  end

  def extract_time(timestamp)
  	timestamp.strftime("%I:%M%p")
  end
  def random_background
    image_list = ["search_background1.jpg", "search_background.jpg", "sbg.jpg", "sbg.jpg", "sbg1.jpg", "sbg2.jpg", "sbg3.jpg", "sbg4.jpg", "sbg5.jpg", "sbg6.jpg", "sbg7.jpg", "sbg8.jpg", "sbg9.jpg", "sbg10.jpg", "sbg11.jpg", "sbg12.jpg" ]
    "background: url('/assets/#{image_list.shuffle[0]}') no-repeat scroll 0% 0% transparent;"
  end
  def unread_messages(user)
    user.mailbox.inbox(:unread => true).count
  end

  def current_user_has_fb_access_token?
    AccessToken.where("user_id =? AND social_network =?", current_user.id, "F").first.present? ? true : false
  end

  def current_user_has_tw_access_token?
    AccessToken.where("user_id =? AND social_network =?", current_user.id, "T").first.present? ? true : false
  end

end