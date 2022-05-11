export interface NavProps {
  navItems: Array<NavItem>;
};

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export interface Prs {
  nodes: Pr[];
}

export interface Pr {
  id: string;
  title: string;
  content: string;
  date: string;
  attachments: Attachment[];
}

export interface Attachment {}

/*
type Attachment struct {}

type Pr struct {
	id primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Id string `bson:"id,omitempty" json:"id"`
	Title string `bson:"title,omitempty" json:"title"`
	Subject string `bson:"subject,omitempty" json:"subject"`
	Date time.Time `bson:"date,omitempty" json:"date"`
	Content string `bson:"content,omitempty" json:"content"`
	Attachments []Attachment `bson:"attachments" json:"attachments"`
}

func (pr *Pr) IsValid() bool {
	sum := len(pr.Id) * len(pr.Title) * len(pr.Subject) * len(pr.Content) * len(pr.Date.String())
	if sum != 0 {
		return true
	}
	return false
}
*/
